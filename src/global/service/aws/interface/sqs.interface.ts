export interface MessageInterface {
  message: Record<string, unknown>;
  delaySeconds?: number;
  messageGroupId?: string;
}

export interface PushMessageReqInterface extends MessageInterface {
  queueName: string;
}

export interface PushMessageBatchReqInterface {
  queueName: string;
  entries: MessageInterface[];
}

export interface PushMessageResInterface {
  mD5OfMessageBody?: string;
  messageId?: string;
}

export interface Successful {
  id: string;
  messageId: string;
  mD5OfMessageBody: string;
}

export interface Failed {
  id: string;
  message?: string;
}

export interface PushMessageBatchResInterface {
  successful: Successful[];
  failed: Failed[];
}
