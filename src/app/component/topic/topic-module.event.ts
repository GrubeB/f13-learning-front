import { Filter } from "../../shared/filter/filter.model";
import { Topic } from "./topic.model";

// EVENTS
export class TopicCreatedEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}
export class TopicUpdateddEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}
export class TopicDeletedEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}

// COMMANDS
export class CreateTopicEvent {
}
export class UpdateTopicEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}
export class DeleteTopicEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}

// COMPONENTS
export class ShowTopicDetailsModalEvent {
    topicId!: string;
    constructor(topicId: string) {
        this.topicId = topicId;
    }
}
export class HideTopicDetailsModalEvent {
}

export class TopicFilterChangedEvent {
    filter!: Filter<Topic>;
    constructor(filter: Filter<Topic>) {
        this.filter = filter;
    }
}