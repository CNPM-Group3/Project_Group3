export interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

export interface ApprovalRequest {
  sender: string;
  requestType: string;
  date: string;
  status: string;
}
