export class Controller {
    name: string;
    endPoints: EndPoint[];
  }
  
  export class EndPoint {
    actionType: string;
    httpType: string;
    definition: string;
    code: string;
  }