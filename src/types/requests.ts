export type GetProtectedUrlResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: {
        link: string;
        destinationUrl: string;
        analitics: boolean;
        deleteAfterRead: boolean;
      };
    };
