export function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
    userAgent
  );
}
