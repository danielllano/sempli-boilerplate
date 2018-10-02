export class Client {
  public personId: number;
  public commercialId: number;
  public commercialName: string;
  public code: string;
  public state: string;
  public companyType: string;
  public socialNetworks: object;
  public additionalInformation: object;
  public creditOfficerId: number;


  constructor(
    personId: number,
    commercialId: number,
    commercialName: string,
    code: string,
    state: string,
    companyType: string,
    socialNetworks: object,
    additionalInformation: object,
    creditOfficerId: number
  ) {
    this.personId = personId;
    this.commercialId = commercialId;
    this.commercialName = commercialName;
    this.code = code;
    this.state = state;
    this.companyType = companyType;
    this.socialNetworks = socialNetworks;
    this.additionalInformation = additionalInformation;
    this.creditOfficerId = creditOfficerId;
  }


}
