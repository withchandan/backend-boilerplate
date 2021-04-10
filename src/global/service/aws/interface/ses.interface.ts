import { DateInterface } from '../../../../shared'

export interface TopicPreferenceInterface {
  topicName: string
  subscriptionStatus: 'OPT_IN' | 'OPT_OUT' | string
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
