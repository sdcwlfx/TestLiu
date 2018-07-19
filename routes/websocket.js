var express = require('express');
var expressWs = require('express-ws');

var router = express.Router();

/*
 * WebSocket 示例
 *
 * 你还需要在 app.js 中添加 `expressWs(app);`
 */

expressWs(router);

router.get('/', (req, res) => {
  res.render('websocket.ejs');
});

router.ws('/echo', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
    ws.send("I am back!");
  });
});

module.exports = router;