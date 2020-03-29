var CONFIG = {};
CONFIG.ConfigLoader = function(url) {
  this.webConfig_ = null;
  this.loadConfig_(url);
};
$.extend(CONFIG.ConfigLoader.prototype, {
  loadConfig_: function(url) {
    var me = this;
    $.ajax({
      async: false,
      url: url,
      type: 'GET',
      dataType: 'json',
    }).done(function(data) {
      me.webConfig_ = data;
    }).fail(function(data, status, desc) {
      me.webConfig_ = false;
      // alert("无法获取配置信息或配置信息有误！");
      // throw new Error(status + "\n" + desc);
    });
  },

  getWebConfig: function() {
    return this.webConfig_;
  },
});
