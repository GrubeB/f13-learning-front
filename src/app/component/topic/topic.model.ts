import { Category } from "../category/category.model";
import { Comment, CommentContainer } from "../comment/comment.model";
import { Reference } from "../reference/reference.model";
import { Voting } from "../voting/vote.model";

export class Topic {
    id!: string;
    name!: string;
    content!: string;
    status!: TopicStatus;
    categories!: Category[];
    references!: Reference[];
    comments!: Comment[];
    voting!: Voting;

    createdBy!: string;
    createdDate!: Date;
    lastModifiedBy!: string;
    lastModifiedDate!: Date;
}

export enum TopicStatus {
    UNVERIFIED,
    VERIFIED
}

export class CreateTopicCommand {
    name!: string;
    content!: string;
    categoryIds!: string[];
}
export class UpdateTopicCommand {
    id!: string;
    name!: string;
    content!: string;
    categoryIds!: string[];
}