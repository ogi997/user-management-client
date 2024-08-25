export interface UserDetail {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  twoFactorEnabled: true;
  phoneNumberConfirm: true;
  accessFaildCount: 0;
}
