import { Category } from "../category/category.model";
import { Reference } from "../reference/reference.model";
import { Topic } from "../topic/topic.model";

export class Group {
    id!: string;
    name!: string;
    content! : string;
    status!: GroupStatus;
    categories!: Category[];
    references!: Reference[];
    
    topics!: Topic[];
    groups!: Group[];
    // comment!: CommentContainer;
    // voting!: Voting;
    
    createdBy!: string;
    createdDate!: Date;
    lastModifiedBy!: string;
    lastModifiedDate!: Date;
}

export enum GroupStatus {
    UNVERIFIED,
    VERIFIED
}

export class CreateGroupCommand {
    name!: string;
    content! : string;
    categoryIds!: string[];
    topicIds!: string[];
    groupIds!: string[];
}

export class UpdateGroupCommand {
    id!: string;
    name!: string;
    content! : string;
    categoryIds!: string[];
    topicIds!: string[];
    groupIds!: string[];
}