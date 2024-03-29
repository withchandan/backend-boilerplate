import { DateInterface } from '../../../../shared'

import { BulkEmailStatus, SubscriptionStatus } from 'aws-sdk/clients/sesv2'

export interface TopicPreferenceInterface {
  topicName: string
  subscriptionStatus: SubscriptionStatus
}

export interface CreateContanctReqInterface {
  contactListName: string
  emailAddress: string
  topicPreferences?: TopicPreferenceInterface[]
  unsubscribeAll?: boolean
  attributesData?: string
}

export interface ReadContactReqInterface
  extends Pick<
    CreateContanctReqInterface,
    'contactListName' | 'emailAddress'
  > {}

export interface ReadContactResInterface
  extends CreateContanctReqInterface,
    DateInterface {}

export interface UpdateContactReqInterface extends CreateContanctReqInterface {}

export interface DeleteContactReqInterface
  extends Pick<
    CreateContanctReqInterface,
    'contactListName' | 'emailAddress'
  > {}

export interface TopicInterface {
  topicName: string
  displayName: string
  description?: string
  defaultSubscriptionStatus: SubscriptionStatus
}

export interface TagInterface {
  key: string
  value: string
}

export interface CreateContactListReqInterface {
  contactListName: string
  topics?: TopicInterface[]
  description?: string
  tags?: TagInterface[]
}

export interface ReadContactListReqInterface
  extends Pick<CreateContactListReqInterface, 'contactListName'> {}

export interface ReadContactListResInterface
  extends CreateContactListReqInterface,
    DateInterface {}

export interface UpdateContactListReqInterface
  extends Pick<
    CreateContactListReqInterface,
    'contactListName' | 'topics' | 'description'
  > {}

export interface DeleteContactListReqInterface
  extends Pick<CreateContactListReqInterface, 'contactListName'> {}

export interface TemplateContent {
  html: string
  text: string
  subject: string
}

export interface CreateTemplateInterface {
  templateName: string
  templateContent: TemplateContent
}

export interface ReadTemplateReqInterface
  extends Pick<CreateTemplateInterface, 'templateName'> {}

export interface ReadTemplateResInterface extends CreateTemplateInterface {}

export interface UpdateTemplateInterface
  extends Pick<CreateTemplateInterface, 'templateName'> {
  templateContent: {
    html?: string
    text?: string
    subject?: string
  }
}

export interface DeleteTemplateReqInterface
  extends Pick<CreateTemplateInterface, 'templateName'> {}

export interface TopicFilter {
  topicName?: string
  useDefaultIfPreferenceUnavailable?: boolean
}

export interface ListContactsFilter {
  filteredStatus?: SubscriptionStatus
  topicFilter?: TopicFilter
}

export interface ReadListContactsReqInterface
  extends Pick<CreateContactListReqInterface, 'contactListName'> {
  pageSize?: number
  nextToken?: string
  filter?: ListContactsFilter
}

export interface Contact
  extends Omit<
    CreateContanctReqInterface,
    'contactListName' | 'attributesData'
  > {
  topicDefaultPreferences?: TopicPreferenceInterface[]
}

export interface ReadListContactsResInterface {
  offset?: string
  contacts?: Contact[]
}

export interface ReadContactListsReqInterface {
  pageSize?: number
  nextToken?: string
}

export interface ContactListInterface {
  contactListName: string
}

export interface ReadContactListsResInterface {
  contactLists: ContactListInterface[]
  nextToken?: string
}

export interface EmailContentInterface {
  templateName: string
  templateData?: Record<string, string | number>
}

export interface EmailDestination {
  to: string[]
  cc: string[]
  bcc: string[]
}

export interface BulkEmailEntry {
  destination: EmailDestination
  templateData: Record<string, string | number>
}

export interface SendBulkEmailReqInterface {
  configurationSetName?: string
  fromEmailAddress?: string
  replyToAddresses?: string[]
  defaultContent: EmailContentInterface
  bulkEmailEntries: BulkEmailEntry[]
}

export interface SendBulkEmailResInterface {
  status?: BulkEmailStatus
  error?: string
  messageId?: string
}
