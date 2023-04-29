export default class MessageModel {
  title: string;
  question: string;
  userEmail?: string;
  id?: number;
  adminEmail?: string;
  response?: string;
  closed?: boolean;

  constructor(title: string, question: string, userEmail?: string, id?: number, adminEmail?: string, response?: string, closed?: boolean) {
    this.id = id;
    this.userEmail = userEmail;
    this.title = title;
    this.question = question;
    this.adminEmail = adminEmail;
    this.response = response;
    this.closed = closed;
  }
}
