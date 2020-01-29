//META{"name":"ClockPluginRedux","displayName":"ClockPluginRedux","website":"https://github.com/NightWolf1038/BetterDiscord-Plugins/tree/master/ClockPluginRedux/","source":"https://raw.githubusercontent.com/NightWolf1038/BetterDiscord-Plugins/master/ClockPluginRedux/ClockPluginRedux.plugin.js"}*//

var ClockPluginRedux = (() => {
	const config = {"main":"index.js","info":{"name":"ClockPluginRedux","authors":[{"name":"NightWolf","discord_id":"242126810026868738","github_username":"NightWolf1038"}],"version":"1.0","description":"Adds a clock to Discord. Based on Jiiks' plugin","github":"https://github.com/NightWolf1038/BetterDiscord-Plugins/tree/master/ClockPluginRedux/","github_raw":"https://raw.githubusercontent.com/NightWolf1038/BetterDiscord-Plugins/master/ClockPluginRedux/ClockPluginRedux.plugin.js"},"changelog":[{"title":"What's New?","items":["Initial release"]}],"defaultConfig":[{"type":"switch","id":"format","name":"24 Hour Format","note":"Change the clock format.","value":true}]};

		return !global.ZeresPluginLibrary ? class {
		getName() {return config.info.name;}
		getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
		getDescription() {return config.info.description;}
		getVersion() {return config.info.version;}
		load() {window.BdApi.alert("Library Missing",`The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}
		start() {}
		stop() {}
	} : (([Plugin, Api]) => {
		const plugin = (Plugin, Library) => {

	return class ClockPluginRedux extends Plugin {

		onStart() {
			BdApi.clearCSS("clockPluginCss");
			BdApi.injectCSS("clockPluginCss",`#clockPluginClock{
					position:absolute;
					left:45%;
					right:50%;
					margin-top:5px;
					color:#FFF;
					background-color:rgba(0, 0, 0, 0);
					padding:0 159px 0 15px;
					min-width:40px;
					max-width:55px;
					z-index:100;
				}`
			);
			this.clock = $("<div/>", { id: "clockPluginClock" });
			$("body").append(this.clock);
			
			var self = this;
			
			if(this.settings.format == true){
				this.ticktock();
				this.interval = setInterval(function(){
                    self.ticktock(self);
                }, 1000);
			}
			else{
				this.ticktock12();
				this.interval = setInterval(function(){
					self.ticktock12(self);
				}, 1000);
			}
		}

		onStop() {
			BdApi.clearCSS("clockPluginCss");
			clearInterval(this.interval);
			this.clock.remove();
		}

		getSettingsPanel() {
			var self = this;
			const panel = this.buildSettingsPanel();
			panel.addListener((id, value) => {
				if (id == "format") {
					if (value){
						clearInterval(this.interval);
						this.ticktock();
						this.interval = setInterval(function(){
							self.ticktock(self);
						}, 1000);
					} else{
						clearInterval(this.interval);
						this.ticktock12();
						this.interval = setInterval(function(){
							self.ticktock12(self);
						}, 1000);
					}
				}
			});
			return panel.getElement();
        }
		
		pad(x) {
			return x < 10 ? '0'+x : x;
		}
		
		ticktock(self) {
			var d = new Date();
			var h = this.pad(d.getHours());
			var m = this.pad(d.getMinutes());
			var s = this.pad(d.getSeconds());
			var current_time = [h,m,s].join(':');
		
			var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
			var currentMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
			var mmm = currentMonth[d.getMonth()];
			var dd = d.getDate();
			if (dd < 10)
				dd = "0" + dd;
			var yyyy = d.getFullYear();
		
			this.clock.html(current_time + "&nbsp" + "-" + "&nbsp" + mmm + "&nbsp" + dd + "," + "&nbsp" + yyyy);
		}
		
		ticktock12(self) {
			var suffix = "AM";
			var d = new Date();
			var h = d.getHours();
			var m = this.pad(d.getMinutes());
			var s = this.pad(d.getSeconds());
			
			var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
			var currentMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			var mmm = currentMonth[d.getMonth()];
			var dd = d.getDate();
			if (dd < 10)
				dd = "0" + dd;
			var yyyy = d.getFullYear();

			if(h >= 12) {
				h -= 12;
				suffix = "PM";
			}
			if(h == 0) {
				h = 12;
			}

			h = this.pad(h);

			var current_time = [h,m,s].join(":") + "&nbsp" + suffix;
			this.clock.html(current_time + "&nbsp" + "-" + "&nbsp" + mmm + "&nbsp" + dd + "," + "&nbsp" + yyyy);
		}
	};

};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
