import { Injectable } from '@nestjs/common'

import { SESV2 } from 'aws-sdk'
import {
  ClientConfiguration,
  CreateContactRequest,
  GetContactRequest,
  UpdateContactRequest,
  DeleteContactRequest,
} from 'aws-sdk/clients/sesv2'

import {
  CreateContanctReqInterface,
  ReadContactReqInterface,
  ReadContactResInterface,
  UpdateContactReqInterface,
  DeleteContactReqInterface,
} from './interface'

@Injectable()
export class SesService {
  private readonly client: SESV2

  private readonly sesv2Config: ClientConfiguration

  constructor() {
    this.sesv2Config = { region: '' }
    this.client = new SESV2(this.sesv2Config)
  }

  // contact
  public async createContact(
    params: CreateContanctReqInterface,
  ): Promise<void> {
    const p: CreateContactRequest = {
      ContactListName: params.contactListName,
      EmailAddress: params.emailAddress,
      UnsubscribeAll: params.unsubscribeAll,
      AttributesData: params.attributesData,
      TopicPreferences: params.topicPreferences?.map((topicPreference) => ({
        TopicName: topicPreference.topicName,
        SubscriptionStatus: topicPreference.subscriptionStatus,
      })),
    }

    await this.client.createContact(p).promise()
  }

  public async readContact(
    params: ReadContactReqInterface,
  ): Promise<ReadContactResInterface> {
    const p: GetContactRequest = {
      ContactListName: params.contactListName,
      EmailAddress: params.emailAddress,
    }

    const contact = await this.client.getContact(p).promise()

    // TODO: fix date
    return {
      contactListName: contact.ContactListName as string,
      emailAddress: contact.EmailAddress as string,
      unsubscribeAll: contact.UnsubscribeAll,
      attributesData: contact.AttributesData,
      topicPreferences: contact.TopicPreferences?.map((topicPreference) => ({
        topicName: topicPreference.TopicName,
        subscriptionStatus: topicPreference.SubscriptionStatus,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  public async updateContact(params: UpdateContactReqInterface): Promise<void> {
    const p: UpdateContactRequest = {
      ContactListName: params.contactListName,
      EmailAddress: params.emailAddress,
      UnsubscribeAll: params.unsubscribeAll,
      AttributesData: params.attributesData,
      TopicPreferences: params.topicPreferences?.map((topicPreference) => ({
        TopicName: topicPreference.topicName,
        SubscriptionStatus: topicPreference.subscriptionStatus,
      })),
    }

    await this.client.updateContact(p).promise()
  }

  public async deleteContact(params: DeleteContactReqInterface): Promise<void> {
    const p: DeleteContactRequest = {
      ContactListName: params.contactListName,
      EmailAddress: params.emailAddress,
    }

    await this.client.deleteContact(p).promise()
  }

  // contact list
  public async createContactList(): Promise<void> {}

  public async updateContactList(): Promise<void> {}

  public async readContactList(): Promise<void> {}

  public async deleteContactList(): Promise<void> {}

  // template
  public async createTemplate(): Promise<void> {}

  public async readTemplate(): Promise<void> {}

  public async updateTemplate(): Promise<void> {}

  public async deleteTemplate(): Promise<void> {}

  // Lists the contacts present in a specific contact list.
  public async listContacts(): Promise<void> {}

  // Lists all of the contact lists available.
  public async listContactLists(): Promise<void> {}

  // Composes an email message to multiple destinations.
  public async sendBulkEmail(): Promise<void> {}
}
