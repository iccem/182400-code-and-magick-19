'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_WIDTH = 300;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var barHeight;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X * 2, CLOUD_Y * 2.5, TEXT_WIDTH);
  ctx.fillText('Список результатов:', CLOUD_X * 2, CLOUD_Y * 4.5, TEXT_WIDTH);

  var maxTime = getMaxElement(times);
  var barLeft = (this.CLOUD_WIDTH - (this.BAR_WIDTH * names.length)) / (names.length + 1);

  for (var i = 0; i < names.length; i++) {
    barHeight = BAR_HEIGHT_MAX * times[i] / maxTime;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'hsl(218, 100%, ' + (20 + 20 * i) + '%)';
    }

    ctx.fillRect(this.CLOUD_X + barLeft + ((BAR_WIDTH + barLeft) * i), CLOUD_HEIGHT - barHeight - GAP * 3, BAR_WIDTH, BAR_HEIGHT_MAX * times[i] / maxTime);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + barLeft + ((BAR_WIDTH + barLeft) * i), CLOUD_HEIGHT - GAP);

    var timesRound = [];
    for (var j = 0; j < times.length; j++) {
      timesRound[j] = Math.round(times[j]);
    }
    ctx.fillText(timesRound[i], CLOUD_X + barLeft + ((BAR_WIDTH + barLeft) * i), CLOUD_HEIGHT - barHeight - (4 * GAP));
  }
};
