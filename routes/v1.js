var express = require('express');
const { cloneDeep, isNumber } = require('lodash');
const request = require('request');
const { sendErrParams, sendError, sendSuccess } = require('../utils/resUtils');
var router = express.Router();

/**
 * @description: Create completion Creates a completion for the provided prompt and parameters
 * @param {*} completions
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
router.post('/completions', function(req, res, next) {
  const { apiKey, prompt, model, timeout } = req.body
  if (!apiKey || !prompt) {
    res.send(sendErrParams(res))
    return
  }
  const query = cloneDeep(req.query)
  delete query.prompt
  delete query.apiKey
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ apiKey }`
  };
  const params = {
    model: model || 'text-davinci-003',
    prompt: prompt,
    ...query
  }
  request.post('https://api.openai.com/v1/completions', {
    headers: headers,
    body: JSON.stringify(params),
    timeout: isNumber(timeout) ? timeout : 60000
  }, async (err, response, body) => {
    if (err) {
      console.log(err);
      res.send(sendError('接口请求失败，可能是网络限制！'));
      return
    }
    if (response.statusCode === 200) {
      const result = JSON.parse(body)
      res.send(sendSuccess(result))
    } else {
      console.log(response.body);
      res.send(sendError(JSON.parse(response.body)));
    }
  })
});

router.post('/chat/completions', function(req, res, next) {
  const { apiKey, messages, model, timeout } = req.body
  if (!apiKey || !messages) {
    res.send(sendErrParams(res))
    return
  }
  const query = cloneDeep(req.query)
  delete query.messages
  delete query.apiKey
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ apiKey }`
  };
  const params = {
    model: model || 'gpt-3.5-turbo',
    messages: messages,
    ...query
  }
  console.log(params);
  request.post('https://api.openai.com/v1/chat/completions', {
    headers: headers,
    body: JSON.stringify(params),
    timeout: isNumber(timeout) ? timeout : 60000
  }, async (err, response, body) => {
    if (err) {
      console.log(err);
      res.send(sendError('接口请求失败，可能是网络限制！'));
      return
    }
    if (response.statusCode === 200) {
      const result = JSON.parse(body)
      res.send(sendSuccess(result))
    } else {
      console.log(response.body);
      res.send(sendError(JSON.parse(response.body)));
    }
  })
});

module.exports = router;
