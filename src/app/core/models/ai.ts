export interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
}

export interface Message {
  role: string;
  content: string;
  reasoning_content: any,
  refusal: any
}


export interface Choice {
  index: number;
  finish_reason: string;
  logprobs: null | any; // Use `any` or a specific type if logprobs has a known structure
  message: Message;
}


export interface getApiResponse {
  id:any,
  object:any,
  choices:Choice[],
  created:any,
  model:any,
  usage:any

}

