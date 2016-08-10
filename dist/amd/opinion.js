define(['exports', 'module'], function (exports, module) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var labelMap = {
    yes: 'Ja',
    no: 'Nein',
    undecided: 'Stimmfreigabe',
    parties: 'Parteien',
    organisations: 'Organisationen und Verbände'
  };

  var Opinion = (function () {
    function Opinion(el, item) {
      _classCallCheck(this, Opinion);

      el.innerHTML = this.render(item.data);
    }

    _createClass(Opinion, [{
      key: 'render',
      value: function render(data) {
        return ['yes', 'no', 'undecided'].reduce(function (prev, curr) {
          var voters = data[curr];
          var parties = voters.parties.filter(function (p) {
            return p !== '';
          });
          var organisations = voters.organisations.filter(function (o) {
            return o !== '';
          });
          if (curr === 'undecided' && parties.length == 0 && organisations.length == 0) {
            return prev;
          }
          var partyLegend = parties.length > 0 ? '<div class="s-font-note-s q-party-parole__label--level2">' + labelMap.parties + '</div>' : '';
          var orgLegend = organisations.length > 0 ? '<div class="s-font-note-s q-party-parole__label--level2">' + labelMap.organisations + '</div>' : '';
          return prev + ('\n        <div class="q-party-parole__position q-party-parole__position--' + curr + '">\n          <div class="s-font-note-s s-font-note-s--strong q-party-parole__label--level1">' + labelMap[curr].toUpperCase() + '</div>\n          <div class="q-party-parole__parties s-font-text">\n            ' + partyLegend + '\n            ' + parties.map(function (p) {
            return '<span class="q-party-parole__party">' + p + '</span>';
          }).join('\n') + '\n          </div>\n          <div class="q-party-parole__organisations s-font-text">\n            ' + orgLegend + '\n            ' + organisations.map(function (o) {
            return '<span class="q-party-parole__org">' + o + '</span>';
          }).join('\n') + '\n          </div>\n        </div>\n      ');
        }, '');
      }
    }]);

    return Opinion;
  })();

  module.exports = Opinion;
});