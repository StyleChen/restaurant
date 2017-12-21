export default function webSocket(callback) {
  // WebSocket 实时更新数据
  const url = JSON.parse(sessionStorage.getItem('userInfo')).webSocketUrl;
  const ws = new WebSocket(url);
  ws.onopen = () => { console.log('onopen'); };
  ws.onmessage = (event) => {
    callback(event);
  };
  ws.onclose = function (event) { console.log('onclose', event); };
  ws.onerror = function (event) { console.log('onerror', event); };
}
