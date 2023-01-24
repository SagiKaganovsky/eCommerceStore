export const convertToFixed = (value: number) => (value / 100).toFixed(2);

export const createFormData = (data: any): FormData => {
  let formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
