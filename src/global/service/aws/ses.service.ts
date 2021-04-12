import { Injectable } from '@nestjs/common'

import { SESV2 } from 'aws-sdk'
import {
  ClientConfiguration,
  SubscriptionStatus,
  CreateContactRequest,
  GetContactRequest,
  UpdateContactRequest,
  DeleteContactRequest,
  CreateContactListRequest,
  UpdateContactListRequest,
  GetContactListRequest,
  DeleteContactListRequest,
  CreateEmailTemplateRequest,
  GetEmailTemplateRequest,
  UpdateEmailTemplateRequest,
  DeleteEmailTemplateRequest,
  ListContactsRequest,
  ListContactListsRequest,
  SendBulkEmailRequest,
} from 'aws-sdk/clients/sesv2'

import {
  CreateContanctReqInterface,
  ReadContactReqInterface,
  ReadContactResInterface,
  UpdateContactReqInterface,
  DeleteContactReqInterface,
  CreateContactListReqInterface,
  UpdateContactListReqInterface,
  ReadContactListReqInterface,
  ReadContactListResInterface,
  DeleteContactListReqInterface,
  CreateTemplateInterface,
  ReadTemplateReqInterface,
  ReadTemplateResInterface,
  UpdateTemplateInterface,
  DeleteTemplateReqInterface,
  ReadListContactsReqInterface,
  ReadListContactsResInterface,
  ReadContactListsReqInterface,
  ReadContactListsResInterface,
  SendBulkEmailReqInterface,
  SendBulkEmailResInterface,
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
  public async createContactList(
    params: CreateContactListReqInterface,
  ): Promise<void> {
    const p: CreateContactListRequest = {
      ContactListName: params.contactListName,
      Topics: params.topics?.map((topic) => ({
        TopicName: topic.topicName,
        DisplayName: topic.displayName,
        Description: topic.description,
        DefaultSubscriptionStatus: topic.defaultSubscriptionStatus,
      })),
      Description: params.description,
      Tags: params.tags?.map((tag) => ({ Key: tag.key, Value: tag.value })),
    }

    await this.client.createContactList(p).promise()
  }

  public async updateContactList(
    params: UpdateContactListReqInterface,
  ): Promise<void> {
    const p: UpdateContactListRequest = {
      ContactListName: params.contactListName,
      Topics: params.topics?.map((topic) => ({
        TopicName: topic.topicName,
        DisplayName: topic.displayName,
        Description: topic.description,
        DefaultSubscriptionStatus: topic.defaultSubscriptionStatus,
      })),
      Description: params.description,
    }

    await this.client.updateContactList(p).promise()
  }

  public async readContactList(
    params: ReadContactListReqInterface,
  ): Promise<ReadContactListResInterface> {
    const p: GetContactListRequest = { ContactListName: params.contactListName }

    const contactList = await this.client.getContactList(p).promise()

    return {
      contactListName: contactList.ContactListName as string,
      topics: contactList.Topics?.map((topic) => ({
        topicName: topic.TopicName as string,
        displayName: topic.DisplayName as string,
        description: topic.Description,
        defaultSubscriptionStatus: topic.DefaultSubscriptionStatus as SubscriptionStatus,
      })),
      description: contactList.Description,
      tags: contactList.Tags?.map((tag) => ({
        key: tag.Key,
        value: tag.Value,
      })),
      createdAt: '',
      updatedAt: '',
    }
  }

  public async deleteContactList(
    params: DeleteContactListReqInterface,
  ): Promise<void> {
    const p: DeleteContactListRequest = {
      ContactListName: params.contactListName,
    }

    await this.client.deleteContactList(p).promise()
  }

  // template
  public async createTemplate(params: CreateTemplateInterface): Promise<void> {
    const p: CreateEmailTemplateRequest = {
      TemplateName: params.templateName,
      TemplateContent: {
        Html: params.templateContent.html,
        Text: params.templateContent.text,
        Subject: params.templateContent.subject,
      },
    }

    await this.client.createEmailTemplate(p).promise()
  }

  public async readTemplate(
    param: ReadTemplateReqInterface,
  ): Promise<ReadTemplateResInterface> {
    const p: GetEmailTemplateRequest = { TemplateName: param.templateName }

    const template = await this.client.getEmailTemplate(p).promise()

    return {
      templateName: template.TemplateName,
      templateContent: {
        html: template.TemplateContent.Html as string,
        text: template.TemplateContent.Text as string,
        subject: template.TemplateContent.Subject as string,
      },
    }
  }

  public async updateTemplate(params: UpdateTemplateInterface): Promise<void> {
    const p: UpdateEmailTemplateRequest = {
      TemplateName: params.templateName,
      TemplateContent: {
        Html: params.templateContent.html,
        Text: params.templateContent.subject,
        Subject: params.templateContent.subject,
      },
    }

    await this.client.updateEmailTemplate(p).promise()
  }

  public async deleteTemplate(
    params: DeleteTemplateReqInterface,
  ): Promise<void> {
    const p: DeleteEmailTemplateRequest = { TemplateName: params.templateName }

    await this.client.deleteEmailTemplate(p).promise()
  }

  // Lists the contacts present in a specific contact list.
  public async listContacts(
    params: ReadListContactsReqInterface,
  ): Promise<ReadListContactsResInterface> {
    const p: ListContactsRequest = {
      ContactListName: params.contactListName,
      PageSize: params.pageSize,
      NextToken: params.nextToken,
      Filter: {
        FilteredStatus: params.filter?.filteredStatus,
        TopicFilter: {
          TopicName: params.filter?.topicFilter?.topicName,
          UseDefaultIfPreferenceUnavailable:
            params.filter?.topicFilter?.useDefaultIfPreferenceUnavailable,
        },
      },
    }

    const contacts = await this.client.listContacts(p).promise()

    return {
      contacts: contacts.Contacts?.map((contact) => ({
        emailAddress: contact.EmailAddress as string,
        unsubscribeAll: contact.UnsubscribeAll as boolean,
        topicPreferences: contact.TopicPreferences?.map((topicPreference) => ({
          topicName: topicPreference.TopicName,
          subscriptionStatus: topicPreference.SubscriptionStatus,
        })),
        topicDefaultPreferences: contact.TopicDefaultPreferences?.map(
          (topicDefaultPreference) => ({
            topicName: topicDefaultPreference.TopicName,
            subscriptionStatus: topicDefaultPreference.SubscriptionStatus,
          }),
        ),
      })),
    }
  }

  // Lists all of the contact lists available.
  public async listContactLists(
    params: ReadContactListsReqInterface,
  ): Promise<ReadContactListsResInterface> {
    const p: ListContactListsRequest = {
      PageSize: params.pageSize,
      NextToken: params.nextToken,
    }

    const list = await this.client.listContactLists(p).promise()

    return {
      contactLists:
        list.ContactLists?.map((contactList) => ({
          contactListName: contactList.ContactListName as string,
        })) || [],
      nextToken: list.NextToken,
    }
  }

  // Composes an email message to multiple destinations.
  public async sendBulkEmail(
    params: SendBulkEmailReqInterface,
  ): Promise<SendBulkEmailResInterface[]> {
    const p: SendBulkEmailRequest = {
      ConfigurationSetName: params.configurationSetName,
      FromEmailAddress: params.fromEmailAddress,
      ReplyToAddresses: params.replyToAddresses,
      DefaultContent: {
        Template: {
          TemplateName: params.defaultContent.templateName,
          TemplateData: JSON.stringify(params.defaultContent.templateData),
        },
      },
      BulkEmailEntries: params.bulkEmailEntries.map((bulkEmailEntry) => ({
        Destination: {
          ToAddresses: bulkEmailEntry.destination.to,
          CcAddresses: bulkEmailEntry.destination.cc,
          BccAddresses: bulkEmailEntry.destination.bcc,
        },
        ReplacementEmailContent: {
          ReplacementTemplate: {
            ReplacementTemplateData: JSON.stringify(
              bulkEmailEntry.templateData,
            ),
          },
        },
      })),
    }

    const res = await this.client.sendBulkEmail(p).promise()

    return res.BulkEmailEntryResults.map((bulkEmailEntryResult) => ({
      status: bulkEmailEntryResult.Status,
      error: bulkEmailEntryResult.Error,
      messageId: bulkEmailEntryResult.MessageId,
    }))
  }
}
