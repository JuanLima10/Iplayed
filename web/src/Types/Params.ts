export interface ParamsProps {
  params: {
    param: string;
  },
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}