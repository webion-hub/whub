import axios from "axios";

export interface ApiHandlerConfig {
  readonly JWT: any,
  readonly jwtEmail: string,
  readonly jwtKey: string,
  readonly targetAudience: string,
  readonly baseUrl: string,
}

export abstract class ApiHandler {
  constructor(private _config: ApiHandlerConfig) {}

  abstract getHandler: (...args: any[]) => Promise<void>

  protected getApi = async () => {
    const jwt = new this._config.JWT({
      email: this._config.jwtEmail,
      key: this._config.jwtKey
    })
  
    const token = await jwt.fetchIdToken(this._config.targetAudience ?? '')
    return axios.create({
        baseURL: this._config.baseUrl,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
  }
}