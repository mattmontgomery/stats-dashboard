export type ResponseMultiple<
  GetType extends string,
  ResponseType,
  ParametersType
> = {
  get: GetType;
  parameters: ParametersType;
  paging: {
    current: number;
    total: number;
  };
  errors: string[];
  results: number;
  response: ResponseType[];
};
