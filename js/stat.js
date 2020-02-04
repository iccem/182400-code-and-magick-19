'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_WIDTH = 300;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderBar = function (ctx, x, y, width, hight, name) {
  if (name === 'Вы') {
    ctx.fillStyle = 'red';
  } else {
    ctx.fillStyle = getRandomColorSaturation();
  }
  ctx.fillRect(x, y, width, hight);
};

var renderName = function (ctx, x, name) {
  ctx.fillStyle = 'black';
  ctx.fillText(name, x, CLOUD_HEIGHT - GAP);
};

var renderTime = function (ctx, x, time, y) {
  var timesRound = Math.round(time);
  ctx.fillStyle = 'black';
  ctx.fillText(timesRound, x, y);
};

var renderTitle = function (ctx) {
  ctx.font = FONT;
  ctx.fillStyle = '#000000';
  ctx.fillText('Список результатов:', CLOUD_X * 2, CLOUD_Y * 4.5, TEXT_WIDTH);
  ctx.fillText('Ура вы победили!', CLOUD_X * 2, CLOUD_Y * 2.5, TEXT_WIDTH);
};

var getRandomColorSaturation = function () {
  var randomNumber = Math.random() * 100;
  return 'hsl(218,' + randomNumber + '%, 50%)';
};

var getGapOnStart = function (names) {
  return (CLOUD_WIDTH - (BAR_WIDTH * names.length)) / (names.length + 1);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderBars = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var gapOnStart = getGapOnStart(names);

  for (var i = 0; i < names.length; i++) {
    var currentTime = times[i];
    var currentRate = i;
    var currentBarHeight = BAR_HEIGHT_MAX * currentTime / maxTime;
    var currentTimePositionY = CLOUD_HEIGHT - currentBarHeight - (4 * GAP);
    var currentX = CLOUD_X + gapOnStart + ((BAR_WIDTH + gapOnStart) * currentRate);
    var currentY = CLOUD_HEIGHT - currentBarHeight - GAP * 3;
    var currentName = names[i];
    renderBar(ctx, currentX, currentY, BAR_WIDTH, currentBarHeight, currentName);
    renderName(ctx, currentX, currentName);
    renderTime(ctx, currentX, currentTime, currentTimePositionY);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderTitle(ctx, CLOUD_X, CLOUD_Y, TEXT_WIDTH);
  renderBars(ctx, names, times);
};
