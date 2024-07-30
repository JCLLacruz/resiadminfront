export const getImageSrc = (data: ArrayBuffer, contentType: string) => {
	const base64String = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	return `data:${contentType};base64,${base64String}`;
};

export const formatToISODate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toISOString();
  };