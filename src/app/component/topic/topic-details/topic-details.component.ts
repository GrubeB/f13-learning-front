import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Topic } from '../topic.model';
import { TopicService } from '../topic.service';
import { first } from 'rxjs';
import { EventBusService } from '../../../shared/service/event-bus.service';
import { TopicQueryService } from '../topic-query.service';
import { NGXLogger } from 'ngx-logger';
import { ReferenceCreatedEvent, ReferenceUpdatedEvent, ReferenceDeletedEvent } from '../../reference/reference-module.event';
import { TopicCommentService } from '../../comment/topic-comment.service';
import { CommentCreatedEvent, CommentDeletedEvent, CommentUpdatedEvent } from '../../comment/comment-module.event';
import { UserProfile2Component } from '../../user/user-profile-2/user-profile-2.component';
import { CommentSectionComponent } from '../../comment/comment-section/comment-section.component';
import { ReferenceSectionComponent } from '../../reference/reference-section/reference-section.component';
import { TopicReferenceService } from '../../reference/topic-reference.service';
import { CategorySectionComponent } from '../../category/category-section/category-section.component';
import { ProgressSetComponent } from '../../progress/progress-setter/progress-setter.component';
import { TopicProgressService } from '../../progress/topic-progress.service';
import { DisLikeRemvedEvent, DislikedEvent, LikeDislikRemovedEvent, LikeRemvedEvent, LikedEvent } from '../../voting/voting-module.event';

@Component({
  selector: 'topic-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    UserProfile2Component,
    CommentSectionComponent,
    ReferenceSectionComponent,
    CategorySectionComponent,
    ProgressSetComponent,
  ],
  templateUrl: './topic-details.component.html',
  styleUrl: './topic-details.component.scss'
})
export class TopicDetailsComponent implements OnInit {
  eventBus = inject(EventBusService);
  logger = inject(NGXLogger);
  service = inject(TopicService);
  queryService = inject(TopicQueryService);
  commentService = inject(TopicCommentService);
  referenceService = inject(TopicReferenceService);
  progressService = inject(TopicProgressService);

  @Input() topicId!: string;
  topic?: Topic;

  constructor() {
    this.eventBus.listen([
      ReferenceCreatedEvent.name,
      ReferenceUpdatedEvent.name,
      ReferenceDeletedEvent.name,

      CommentCreatedEvent.name,
      CommentUpdatedEvent.name,
      CommentDeletedEvent.name,

      LikedEvent.name,
      LikeRemvedEvent.name,
      DislikedEvent.name,
      DisLikeRemvedEvent.name,
      LikeDislikRemovedEvent.name,
    ], (event: any) => {
      this.getTopic(this.topicId);
    });
  }

  ngOnInit(): void {
    this.getTopic(this.topicId);
  }

  getTopic(id: string): void {
    this.logger.debug(TopicDetailsComponent.name, "getTopic()");
    this.queryService.get(id).pipe(first()).subscribe({
      next: data => {
        this.topic = data;
        this.logger.debug(TopicDetailsComponent.name, "topic: ", this.topic);
      },
      error: e => {
      }
    });
  }
}
