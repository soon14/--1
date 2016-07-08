!
function() {
	"use strict";
	var Faye = {
		VERSION: "1.0.3",
		BAYEUX_VERSION: "1.0",
		ID_LENGTH: 160,
		JSONP_CALLBACK: "jsonpcallback",
		CONNECTION_TYPES: ["long-polling", "cross-origin-long-polling", "callback-polling", "websocket", "eventsource", "in-process"],
		MANDATORY_CONNECTION_TYPES: ["long-polling", "callback-polling", "in-process"],
		ENV: "undefined" != typeof window ? window : global,
		extend: function(e, t, n) {
			if (!t) return e;
			for (var i in t) t.hasOwnProperty(i) && (e.hasOwnProperty(i) && n === !1 || e[i] !== t[i] && (e[i] = t[i]));
			return e
		},
		random: function(e) {
			return e = e || this.ID_LENGTH, csprng(e, 36)
		},
		clientIdFromMessages: function(e) {
			var t = this.filter([].concat(e), function(e) {
				return "/meta/connect" === e.channel
			});
			return t[0] && t[0].clientId
		},
		copyObject: function(e) {
			var t, n, i;
			if (e instanceof Array) {
				for (t = [], n = e.length; n--;) t[n] = Faye.copyObject(e[n]);
				return t
			}
			if ("object" == typeof e) {
				t = null === e ? null : {};
				for (i in e) t[i] = Faye.copyObject(e[i]);
				return t
			}
			return e
		},
		commonElement: function(e, t) {
			for (var n = 0, i = e.length; i > n; n++) if (-1 !== this.indexOf(t, e[n])) return e[n];
			return null
		},
		indexOf: function(e, t) {
			if (e.indexOf) return e.indexOf(t);
			for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
			return -1
		},
		map: function(e, t, n) {
			if (e.map) return e.map(t, n);
			var i = [];
			if (e instanceof Array) for (var s = 0, r = e.length; r > s; s++) i.push(t.call(n || null, e[s], s));
			else for (var o in e) e.hasOwnProperty(o) && i.push(t.call(n || null, o, e[o]));
			return i
		},
		filter: function(e, t, n) {
			if (e.filter) return e.filter(t, n);
			for (var i = [], s = 0, r = e.length; r > s; s++) t.call(n || null, e[s], s) && i.push(e[s]);
			return i
		},
		asyncEach: function(e, t, n, i) {
			var s = e.length,
				r = -1,
				o = 0,
				a = !1,
				c = function() {
					return o -= 1, r += 1, r === s ? n && n.call(i) : void t(e[r], h)
				},
				u = function() {
					if (!a) {
						for (a = !0; o > 0;) c();
						a = !1
					}
				},
				h = function() {
					o += 1, u()
				};
			h()
		},
		toJSON: function(e) {
			return this.stringify ? this.stringify(e, function(e, t) {
				return this[e] instanceof Array ? this[e] : t
			}) : JSON.stringify(e)
		}
	};
	"undefined" != typeof module ? module.exports = Faye : "undefined" != typeof window && (window.Faye = Faye), Faye.Class = function(e, t) {
		"function" != typeof e && (t = e, e = Object);
		var n = function() {
				return this.initialize ? this.initialize.apply(this, arguments) || this : this
			},
			i = function() {};
		return i.prototype = e.prototype, n.prototype = new i, Faye.extend(n.prototype, t), n
	}, function() {
		function e(e, t) {
			if (e.indexOf) return e.indexOf(t);
			for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
			return -1
		}
		var t = Faye.EventEmitter = function() {},
			n = "function" == typeof Array.isArray ? Array.isArray : function(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			};
		t.prototype.emit = function(e) {
			if ("error" === e && (!this._events || !this._events.error || n(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : Error("Uncaught, unspecified 'error' event.");
			if (!this._events) return !1;
			var t = this._events[e];
			if (!t) return !1;
			if ("function" == typeof t) {
				switch (arguments.length) {
				case 1:
					t.call(this);
					break;
				case 2:
					t.call(this, arguments[1]);
					break;
				case 3:
					t.call(this, arguments[1], arguments[2]);
					break;
				default:
					var i = Array.prototype.slice.call(arguments, 1);
					t.apply(this, i)
				}
				return !0
			}
			if (n(t)) {
				for (var i = Array.prototype.slice.call(arguments, 1), s = t.slice(), r = 0, o = s.length; o > r; r++) s[r].apply(this, i);
				return !0
			}
			return !1
		}, t.prototype.addListener = function(e, t) {
			if ("function" != typeof t) throw Error("addListener only takes instances of Function");
			return this._events || (this._events = {}), this.emit("newListener", e, t), this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, this
		}, t.prototype.on = t.prototype.addListener, t.prototype.once = function(e, t) {
			var n = this;
			return n.on(e, function i() {
				n.removeListener(e, i), t.apply(this, arguments)
			}), this
		}, t.prototype.removeListener = function(t, i) {
			if ("function" != typeof i) throw Error("removeListener only takes instances of Function");
			if (!this._events || !this._events[t]) return this;
			var s = this._events[t];
			if (n(s)) {
				var r = e(s, i);
				if (0 > r) return this;
				s.splice(r, 1), 0 == s.length && delete this._events[t]
			} else this._events[t] === i && delete this._events[t];
			return this
		}, t.prototype.removeAllListeners = function(e) {
			return 0 === arguments.length ? (this._events = {}, this) : (e && this._events && this._events[e] && (this._events[e] = null), this)
		}, t.prototype.listeners = function(e) {
			return this._events || (this._events = {}), this._events[e] || (this._events[e] = []), n(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
		}
	}(), Faye.Namespace = Faye.Class({
		initialize: function() {
			this._used = {}
		},
		exists: function(e) {
			return this._used.hasOwnProperty(e)
		},
		generate: function() {
			for (var e = Faye.random(); this._used.hasOwnProperty(e);) e = Faye.random();
			return this._used[e] = e
		},
		release: function(e) {
			delete this._used[e]
		}
	}), function() {
		var e, t = setTimeout;
		e = "function" == typeof setImmediate ?
		function(e) {
			setImmediate(e)
		} : "object" == typeof process && process.nextTick ?
		function(e) {
			process.nextTick(e)
		} : function(e) {
			t(e, 0)
		};
		var n = 0,
			i = 1,
			s = 2,
			r = function(e) {
				return e
			},
			o = function(e) {
				throw e
			},
			a = function(e) {
				if (this._state = n, this._callbacks = [], this._errbacks = [], "function" == typeof e) {
					var t = this;
					e(function(e) {
						f(t, e)
					}, function(e) {
						p(t, e)
					})
				}
			};
		a.prototype.then = function(e, t) {
			var n = {},
				i = this;
			return n.promise = new a(function(s, r) {
				n.fulfill = s, n.reject = r, c(i, e, n), u(i, t, n)
			}), n.promise
		};
		var c = function(e, t, s) {
				"function" != typeof t && (t = r);
				var o = function(e) {
						h(t, e, s)
					};
				e._state === n ? e._callbacks.push(o) : e._state === i && o(e._value)
			},
			u = function(e, t, i) {
				"function" != typeof t && (t = o);
				var r = function(e) {
						h(t, e, i)
					};
				e._state === n ? e._errbacks.push(r) : e._state === s && r(e._reason)
			},
			h = function(t, n, i) {
				e(function() {
					l(t, n, i)
				})
			},
			l = function(e, t, n) {
				var i, s, o, a = !1;
				try {
					if (i = e(t), s = typeof i, o = null !== i && ("function" === s || "object" === s) && i.then, i === n.promise) return n.reject(new TypeError("Recursive promise chain detected"));
					if ("function" != typeof o) return n.fulfill(i);
					o.call(i, function(e) {
						a || (a = !0, l(r, e, n))
					}, function(e) {
						a || (a = !0, n.reject(e))
					})
				} catch (c) {
					if (a) return;
					a = !0, n.reject(c)
				}
			},
			f = a.fulfill = a.resolve = function(e, t) {
				if (e._state === n) {
					e._state = i, e._value = t, e._errbacks = [];
					for (var s, r = e._callbacks; s = r.shift();) s(t)
				}
			},
			p = a.reject = function(e, t) {
				if (e._state === n) {
					e._state = s, e._reason = t, e._callbacks = [];
					for (var i, r = e._errbacks; i = r.shift();) i(t)
				}
			};
		a.defer = e, a.deferred = a.pending = function() {
			var e = {};
			return e.promise = new a(function(t, n) {
				e.fulfill = e.resolve = t, e.reject = n
			}), e
		}, a.fulfilled = a.resolved = function(e) {
			return new a(function(t) {
				t(e)
			})
		}, a.rejected = function(e) {
			return new a(function(t, n) {
				n(e)
			})
		}, void 0 === Faye ? module.exports = a : Faye.Promise = a
	}(), Faye.Set = Faye.Class({
		initialize: function() {
			this._index = {}
		},
		add: function(e) {
			var t = void 0 !== e.id ? e.id : e;
			return this._index.hasOwnProperty(t) ? !1 : (this._index[t] = e, !0)
		},
		forEach: function(e, t) {
			for (var n in this._index) this._index.hasOwnProperty(n) && e.call(t, this._index[n])
		},
		isEmpty: function() {
			for (var e in this._index) if (this._index.hasOwnProperty(e)) return !1;
			return !0
		},
		member: function(e) {
			for (var t in this._index) if (this._index[t] === e) return !0;
			return !1
		},
		remove: function(e) {
			var t = void 0 !== e.id ? e.id : e,
				n = this._index[t];
			return delete this._index[t], n
		},
		toArray: function() {
			var e = [];
			return this.forEach(function(t) {
				e.push(t)
			}), e
		}
	}), Faye.URI = {
		isURI: function(e) {
			return e && e.protocol && e.host && e.path
		},
		isSameOrigin: function(e) {
			var t = Faye.ENV.location;
			return e.protocol === t.protocol && e.hostname === t.hostname && e.port === t.port
		},
		parse: function(e) {
			if ("string" != typeof e) return e;
			var t, n, i, s, r, o, a = {},
				c = function(t, n) {
					e = e.replace(n, function(e) {
						return a[t] = e, ""
					}), a[t] = a[t] || ""
				};
			for (c("protocol", /^[a-z]+\:/i), c("host", /^\/\/[^\/\?#]+/), /^\//.test(e) || a.host || (e = Faye.ENV.location.pathname.replace(/[^\/]*$/, "") + e), c("pathname", /^[^\?#]*/), c("search", /^\?[^#]*/), c("hash", /^#.*/), a.protocol = a.protocol || Faye.ENV.location.protocol, a.host ? (a.host = a.host.substr(2), t = a.host.split(":"), a.hostname = t[0], a.port = t[1] || "") : (a.host = Faye.ENV.location.host, a.hostname = Faye.ENV.location.hostname, a.port = Faye.ENV.location.port), a.pathname = a.pathname || "/", a.path = a.pathname + a.search, n = a.search.replace(/^\?/, ""), i = n ? n.split("&") : [], o = {}, s = 0, r = i.length; r > s; s++) t = i[s].split("="), o[decodeURIComponent(t[0] || "")] = decodeURIComponent(t[1] || "");
			return a.query = o, a.href = this.stringify(a), a
		},
		stringify: function(e) {
			var t = e.protocol + "//" + e.hostname;
			return e.port && (t += ":" + e.port), t += e.pathname + this.queryString(e.query) + (e.hash || "")
		},
		queryString: function(e) {
			var t = [];
			for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
			return 0 === t.length ? "" : "?" + t.join("&")
		}
	}, Faye.Error = Faye.Class({
		initialize: function(e, t, n) {
			this.code = e, this.params = Array.prototype.slice.call(t), this.message = n
		},
		toString: function() {
			return this.code + ":" + this.params.join(",") + ":" + this.message
		}
	}), Faye.Error.parse = function(e) {
		if (e = e || "", !Faye.Grammar.ERROR.test(e)) return new this(null, [], e);
		var t = e.split(":"),
			n = parseInt(t[0]),
			i = t[1].split(","),
			e = t[2];
		return new this(n, i, e)
	}, Faye.Error.versionMismatch = function() {
		return "" + new this(300, arguments, "Version mismatch")
	}, Faye.Error.conntypeMismatch = function() {
		return "" + new this(301, arguments, "Connection types not supported")
	}, Faye.Error.extMismatch = function() {
		return "" + new this(302, arguments, "Extension mismatch")
	}, Faye.Error.badRequest = function() {
		return "" + new this(400, arguments, "Bad request")
	}, Faye.Error.clientUnknown = function() {
		return "" + new this(401, arguments, "Unknown client")
	}, Faye.Error.parameterMissing = function() {
		return "" + new this(402, arguments, "Missing required parameter")
	}, Faye.Error.channelForbidden = function() {
		return "" + new this(403, arguments, "Forbidden channel")
	}, Faye.Error.channelUnknown = function() {
		return "" + new this(404, arguments, "Unknown channel")
	}, Faye.Error.channelInvalid = function() {
		return "" + new this(405, arguments, "Invalid channel")
	}, Faye.Error.extUnknown = function() {
		return "" + new this(406, arguments, "Unknown extension")
	}, Faye.Error.publishFailed = function() {
		return "" + new this(407, arguments, "Failed to publish")
	}, Faye.Error.serverError = function() {
		return "" + new this(500, arguments, "Internal server error")
	}, Faye.Deferrable = {
		then: function(e, t) {
			var n = this;
			return this._promise || (this._promise = new Faye.Promise(function(e, t) {
				n._fulfill = e, n._reject = t
			})), 0 === arguments.length ? this._promise : this._promise.then(e, t)
		},
		callback: function(e, t) {
			return this.then(function(n) {
				e.call(t, n)
			})
		},
		errback: function(e, t) {
			return this.then(null, function(n) {
				e.call(t, n)
			})
		},
		timeout: function(e, t) {
			this.then();
			var n = this;
			this._timer = Faye.ENV.setTimeout(function() {
				n._reject(t)
			}, 1e3 * e)
		},
		setDeferredStatus: function(e, t) {
			this._timer && Faye.ENV.clearTimeout(this._timer);
			this.then();
			"succeeded" === e ? this._fulfill(t) : "failed" === e ? this._reject(t) : delete this._promise
		}
	}, Faye.Publisher = {
		countListeners: function(e) {
			return this.listeners(e).length
		},
		bind: function(e, t, n) {
			var i = Array.prototype.slice,
				s = function() {
					t.apply(n, i.call(arguments))
				};
			return this._listeners = this._listeners || [], this._listeners.push([e, t, n, s]), this.on(e, s)
		},
		unbind: function(e, t, n) {
			this._listeners = this._listeners || [];
			for (var i, s = this._listeners.length; s--;) i = this._listeners[s], i[0] === e && (!t || i[1] === t && i[2] === n) && (this._listeners.splice(s, 1), this.removeListener(e, i[3]))
		}
	}, Faye.extend(Faye.Publisher, Faye.EventEmitter.prototype), Faye.Publisher.trigger = Faye.Publisher.emit, Faye.Timeouts = {
		addTimeout: function(e, t, n, i) {
			if (this._timeouts = this._timeouts || {}, !this._timeouts.hasOwnProperty(e)) {
				var s = this;
				this._timeouts[e] = Faye.ENV.setTimeout(function() {
					delete s._timeouts[e], n.call(i)
				}, 1e3 * t)
			}
		},
		removeTimeout: function(e) {
			this._timeouts = this._timeouts || {};
			var t = this._timeouts[e];
			t && (clearTimeout(t), delete this._timeouts[e])
		},
		removeAllTimeouts: function() {
			this._timeouts = this._timeouts || {};
			for (var e in this._timeouts) this.removeTimeout(e)
		}
	}, Faye.Logging = {
		LOG_LEVELS: {
			fatal: 4,
			error: 3,
			warn: 2,
			info: 1,
			debug: 0
		},
		writeLog: function(e, t) {
			if (Faye.logger) {
				var e = Array.prototype.slice.apply(e),
					n = "[Faye",
					i = this.className,
					s = e.shift().replace(/\?/g, function() {
						try {
							return Faye.toJSON(e.shift())
						} catch (t) {
							return "[Object]"
						}
					});
				for (var r in Faye) i || "function" == typeof Faye[r] && this instanceof Faye[r] && (i = r);
				i && (n += "." + i), n += "] ", "function" == typeof Faye.logger[t] ? Faye.logger[t](n + s) : "function" == typeof Faye.logger && Faye.logger(n + s)
			}
		}
	}, function() {
		for (var e in Faye.Logging.LOG_LEVELS)(function(e) {
			Faye.Logging[e] = function() {
				this.writeLog(arguments, e)
			}
		})(e, Faye.Logging.LOG_LEVELS[e])
	}(), Faye.Grammar = {
		CHANNEL_NAME: /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
		CHANNEL_PATTERN: /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
		ERROR: /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
		VERSION: /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
	}, Faye.Extensible = {
		addExtension: function(e) {
			this._extensions = this._extensions || [], this._extensions.push(e), e.added && e.added(this)
		},
		removeExtension: function(e) {
			if (this._extensions) for (var t = this._extensions.length; t--;) this._extensions[t] === e && (this._extensions.splice(t, 1), e.removed && e.removed(this))
		},
		pipeThroughExtensions: function(e, t, n, i, s) {
			if (this.debug("Passing through ? extensions: ?", e, t), !this._extensions) return i.call(s, t);
			var r = this._extensions.slice(),
				o = function(t) {
					if (!t) return i.call(s, t);
					var a = r.shift();
					if (!a) return i.call(s, t);
					var c = a[e];
					return c ? void(c.length >= 3 ? a[e](t, n, o) : a[e](t, o)) : o(t)
				};
			o(t)
		}
	}, Faye.extend(Faye.Extensible, Faye.Logging), Faye.Channel = Faye.Class({
		initialize: function(e) {
			this.id = this.name = e
		},
		push: function(e) {
			this.trigger("message", e)
		},
		isUnused: function() {
			return 0 === this.countListeners("message")
		}
	}), Faye.extend(Faye.Channel.prototype, Faye.Publisher), Faye.extend(Faye.Channel, {
		HANDSHAKE: "/meta/handshake",
		CONNECT: "/meta/connect",
		SUBSCRIBE: "/meta/subscribe",
		UNSUBSCRIBE: "/meta/unsubscribe",
		DISCONNECT: "/meta/disconnect",
		META: "meta",
		SERVICE: "service",
		expand: function(e) {
			var t = this.parse(e),
				n = ["/**", e],
				i = t.slice();
			i[i.length - 1] = "*", n.push(this.unparse(i));
			for (var s = 1, r = t.length; r > s; s++) i = t.slice(0, s), i.push("**"), n.push(this.unparse(i));
			return n
		},
		isValid: function(e) {
			return Faye.Grammar.CHANNEL_NAME.test(e) || Faye.Grammar.CHANNEL_PATTERN.test(e)
		},
		parse: function(e) {
			return this.isValid(e) ? e.split("/").slice(1) : null
		},
		unparse: function(e) {
			return "/" + e.join("/")
		},
		isMeta: function(e) {
			var t = this.parse(e);
			return t ? t[0] === this.META : null
		},
		isService: function(e) {
			var t = this.parse(e);
			return t ? t[0] === this.SERVICE : null
		},
		isSubscribable: function(e) {
			return this.isValid(e) ? !this.isMeta(e) && !this.isService(e) : null
		},
		Set: Faye.Class({
			initialize: function() {
				this._channels = {}
			},
			getKeys: function() {
				var e = [];
				for (var t in this._channels) e.push(t);
				return e
			},
			remove: function(e) {
				delete this._channels[e]
			},
			hasSubscription: function(e) {
				return this._channels.hasOwnProperty(e)
			},
			subscribe: function(e, t, n) {
				if (t) for (var i, s = 0, r = e.length; r > s; s++) {
					i = e[s];
					var o = this._channels[i] = this._channels[i] || new Faye.Channel(i);
					o.bind("message", t, n)
				}
			},
			unsubscribe: function(e, t, n) {
				var i = this._channels[e];
				return i ? (i.unbind("message", t, n), i.isUnused() ? (this.remove(e), !0) : !1) : !1
			},
			distributeMessage: function(e) {
				for (var t = Faye.Channel.expand(e.channel), n = 0, i = t.length; i > n; n++) {
					var s = this._channels[t[n]];
					s && s.trigger("message", e.data)
				}
			}
		})
	}), Faye.Envelope = Faye.Class({
		initialize: function(e, t) {
			this.id = e.id, this.message = e, void 0 !== t && this.timeout(t / 1e3, !1)
		}
	}), Faye.extend(Faye.Envelope.prototype, Faye.Deferrable), Faye.Publication = Faye.Class(Faye.Deferrable), Faye.Subscription = Faye.Class({
		initialize: function(e, t, n, i) {
			this._client = e, this._channels = t, this._callback = n, this._context = i, this._cancelled = !1
		},
		cancel: function() {
			this._cancelled || (this._client.unsubscribe(this._channels, this._callback, this._context), this._cancelled = !0)
		},
		unsubscribe: function() {
			this.cancel()
		}
	}), Faye.extend(Faye.Subscription.prototype, Faye.Deferrable), Faye.Client = Faye.Class({
		UNCONNECTED: 1,
		CONNECTING: 2,
		CONNECTED: 3,
		DISCONNECTED: 4,
		HANDSHAKE: "handshake",
		RETRY: "retry",
		NONE: "none",
		CONNECTION_TIMEOUT: 60,
		DEFAULT_RETRY: 5,
		MAX_REQUEST_SIZE: 2048,
		DEFAULT_ENDPOINT: "/bayeux",
		INTERVAL: 0,
		initialize: function(e, t) {
			this.info("New client created for ?", e), this._options = t || {}, this.endpoint = Faye.URI.parse(e || this.DEFAULT_ENDPOINT), this.endpoints = this._options.endpoints || {}, this.transports = {}, this.cookies = Faye.CookieJar && new Faye.CookieJar, this.headers = {}, this.ca = this._options.ca, this._disabled = [], this._retry = this._options.retry || this.DEFAULT_RETRY;
			for (var n in this.endpoints) this.endpoints[n] = Faye.URI.parse(this.endpoints[n]);
			this.maxRequestSize = this.MAX_REQUEST_SIZE, this._state = this.UNCONNECTED, this._channels = new Faye.Channel.Set, this._messageId = 0, this._responseCallbacks = {}, this._advice = {
				reconnect: this.RETRY,
				interval: 1e3 * (this._options.interval || this.INTERVAL),
				timeout: 1e3 * (this._options.timeout || this.CONNECTION_TIMEOUT)
			}, Faye.Event && void 0 !== Faye.ENV.onbeforeunload && Faye.Event.on(Faye.ENV, "beforeunload", function() {
				Faye.indexOf(this._disabled, "autodisconnect") < 0 && this.disconnect()
			}, this)
		},
		disable: function(e) {
			this._disabled.push(e)
		},
		setHeader: function(e, t) {
			this.headers[e] = t
		},
		handshake: function(e, t) {
			if (this._advice.reconnect !== this.NONE && this._state === this.UNCONNECTED) {
				this._state = this.CONNECTING;
				var n = this;
				this.info("Initiating handshake with ?", Faye.URI.stringify(this.endpoint)), this._selectTransport(Faye.MANDATORY_CONNECTION_TYPES), this._send({
					channel: Faye.Channel.HANDSHAKE,
					version: Faye.BAYEUX_VERSION,
					supportedConnectionTypes: [this._transport.connectionType]
				}, function(i) {
					i.successful ? (this._state = this.CONNECTED, this._clientId = i.clientId, this._selectTransport(i.supportedConnectionTypes), this.info("Handshake successful: ?", this._clientId), this.subscribe(this._channels.getKeys(), !0), e && Faye.Promise.defer(function() {
						e.call(t)
					})) : (this.info("Handshake unsuccessful"), Faye.ENV.setTimeout(function() {
						n.handshake(e, t)
					}, this._advice.interval), this._state = this.UNCONNECTED)
				}, this)
			}
		},
		connect: function(e, t) {
			if (this._advice.reconnect !== this.NONE && this._state !== this.DISCONNECTED) {
				if (this._state === this.UNCONNECTED) return this.handshake(function() {
					this.connect(e, t)
				}, this);
				this.callback(e, t), this._state === this.CONNECTED && (this.info("Calling deferred actions for ?", this._clientId), this.setDeferredStatus("succeeded"), this.setDeferredStatus("unknown"), this._connectRequest || (this._connectRequest = !0, this.info("Initiating connection for ?", this._clientId), this._send({
					channel: Faye.Channel.CONNECT,
					clientId: this._clientId,
					connectionType: this._transport.connectionType
				}, this._cycleConnection, this)))
			}
		},
		disconnect: function() {
			this._state === this.CONNECTED && (this._state = this.DISCONNECTED, this.info("Disconnecting ?", this._clientId), this._send({
				channel: Faye.Channel.DISCONNECT,
				clientId: this._clientId
			}, function(e) {
				e.successful && (this._transport.close(), delete this._transport)
			}, this), this.info("Clearing channel listeners for ?", this._clientId), this._channels = new Faye.Channel.Set)
		},
		subscribe: function(e, t, n) {
			if (e instanceof Array) return Faye.map(e, function(e) {
				return this.subscribe(e, t, n)
			}, this);
			var i = new Faye.Subscription(this, e, t, n),
				s = t === !0,
				r = this._channels.hasSubscription(e);
			return r && !s ? (this._channels.subscribe([e], t, n), i.setDeferredStatus("succeeded"), i) : (this.connect(function() {
				this.info("Client ? attempting to subscribe to ?", this._clientId, e), s || this._channels.subscribe([e], t, n), this._send({
					channel: Faye.Channel.SUBSCRIBE,
					clientId: this._clientId,
					subscription: e
				}, function(s) {
					if (!s.successful) return i.setDeferredStatus("failed", Faye.Error.parse(s.error)), this._channels.unsubscribe(e, t, n);
					var r = [].concat(s.subscription);
					this.info("Subscription acknowledged for ? to ?", this._clientId, r), i.setDeferredStatus("succeeded")
				}, this)
			}, this), i)
		},
		unsubscribe: function(e, t, n) {
			if (e instanceof Array) return Faye.map(e, function(e) {
				return this.unsubscribe(e, t, n)
			}, this);
			var i = this._channels.unsubscribe(e, t, n);
			i && this.connect(function() {
				this.info("Client ? attempting to unsubscribe from ?", this._clientId, e), this._send({
					channel: Faye.Channel.UNSUBSCRIBE,
					clientId: this._clientId,
					subscription: e
				}, function(e) {
					if (e.successful) {
						var t = [].concat(e.subscription);
						this.info("Unsubscription acknowledged for ? from ?", this._clientId, t)
					}
				}, this)
			}, this)
		},
		publish: function(e, t) {
			var n = new Faye.Publication;
			return this.connect(function() {
				this.info("Client ? queueing published message to ?: ?", this._clientId, e, t), this._send({
					channel: e,
					data: t,
					clientId: this._clientId
				}, function(e) {
					e.successful ? n.setDeferredStatus("succeeded") : n.setDeferredStatus("failed", Faye.Error.parse(e.error))
				}, this)
			}, this), n
		},
		receiveMessage: function(e) {
			var t, n = e.id;
			void 0 !== e.successful && (t = this._responseCallbacks[n], delete this._responseCallbacks[n]), this.pipeThroughExtensions("incoming", e, null, function(e) {
				e && (e.advice && this._handleAdvice(e.advice), this._deliverMessage(e), t && t[0].call(t[1], e))
			}, this), this._transportUp !== !0 && (this._transportUp = !0, this.trigger("transport:up"))
		},
		messageError: function(e, t) {
			for (var n, i, s = this._retry, r = this, o = 0, a = e.length; a > o; o++) i = e[o], n = i.id, t ? this._transportSend(i) : Faye.ENV.setTimeout(function() {
				r._transportSend(i)
			}, 1e3 * s);
			t || this._transportUp === !1 || (this._transportUp = !1, this.trigger("transport:down"))
		},
		_selectTransport: function(e) {
			Faye.Transport.get(this, e, this._disabled, function(e) {
				this.debug("Selected ? transport for ?", e.connectionType, Faye.URI.stringify(e.endpoint)), e !== this._transport && (this._transport && this._transport.close(), this._transport = e)
			}, this)
		},
		_send: function(e, t, n) {
			this._transport && (e.id = e.id || this._generateMessageId(), this.pipeThroughExtensions("outgoing", e, null, function(e) {
				e && (t && (this._responseCallbacks[e.id] = [t, n]), this._transportSend(e))
			}, this))
		},
		_transportSend: function(e) {
			if (this._transport) {
				var t = 1.2 * (this._advice.timeout || 1e3 * this._retry),
					n = new Faye.Envelope(e, t);
				n.errback(function(t) {
					this.messageError([e], t)
				}, this), this._transport.send(n)
			}
		},
		_generateMessageId: function() {
			return this._messageId += 1, this._messageId >= Math.pow(2, 32) && (this._messageId = 0), this._messageId.toString(36)
		},
		_handleAdvice: function(e) {
			Faye.extend(this._advice, e), this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED && (this._state = this.UNCONNECTED, this._clientId = null, this._cycleConnection())
		},
		_deliverMessage: function(e) {
			e.channel && void 0 !== e.data && (this.info("Client ? calling listeners for ? with ?", this._clientId, e.channel, e.data), this._channels.distributeMessage(e))
		},
		_cycleConnection: function() {
			this._connectRequest && (this._connectRequest = null, this.info("Closed connection for ?", this._clientId));
			var e = this;
			Faye.ENV.setTimeout(function() {
				e.connect()
			}, this._advice.interval)
		}
	}), Faye.extend(Faye.Client.prototype, Faye.Deferrable), Faye.extend(Faye.Client.prototype, Faye.Publisher), Faye.extend(Faye.Client.prototype, Faye.Logging), Faye.extend(Faye.Client.prototype, Faye.Extensible), Faye.Transport = Faye.extend(Faye.Class({
		MAX_DELAY: 0,
		batching: !0,
		initialize: function(e, t) {
			this._client = e, this.endpoint = t, this._outbox = []
		},
		close: function() {},
		encode: function() {
			return ""
		},
		send: function(e) {
			var t = e.message;
			return this.debug("Client ? sending message to ?: ?", this._client._clientId, Faye.URI.stringify(this.endpoint), t), this.batching ? (this._outbox.push(e), t.channel === Faye.Channel.HANDSHAKE ? this.addTimeout("publish", .01, this.flush, this) : (t.channel === Faye.Channel.CONNECT && (this._connectMessage = t), this.flushLargeBatch(), void this.addTimeout("publish", this.MAX_DELAY, this.flush, this))) : this.request([e])
		},
		flush: function() {
			this.removeTimeout("publish"), this._outbox.length > 1 && this._connectMessage && (this._connectMessage.advice = {
				timeout: 0
			}), this.request(this._outbox), this._connectMessage = null, this._outbox = []
		},
		flushLargeBatch: function() {
			var e = this.encode(this._outbox);
			if (!(e.length < this._client.maxRequestSize)) {
				var t = this._outbox.pop();
				this.flush(), t && this._outbox.push(t)
			}
		},
		receive: function(e, t) {
			for (var n = e.length; n--;) e[n].setDeferredStatus("succeeded");
			t = [].concat(t), this.debug("Client ? received from ?: ?", this._client._clientId, Faye.URI.stringify(this.endpoint), t);
			for (var i = 0, n = t.length; n > i; i++) this._client.receiveMessage(t[i])
		},
		handleError: function(e, t) {
			for (var n = e.length; n--;) e[n].setDeferredStatus("failed", t)
		},
		_getCookies: function() {
			var e = this._client.cookies;
			return e ? e.getCookies({
				domain: this.endpoint.hostname,
				path: this.endpoint.path,
				secure: "https:" === this.endpoint.protocol
			}).toValueString() : ""
		},
		_storeCookies: function(e) {
			if (e && this._client.cookies) {
				e = [].concat(e);
				for (var t, n = 0, i = e.length; i > n; n++) t = this._client.cookies.setCookie(e[n]), t = t[0] || t, t.domain = t.domain || this.endpoint.hostname
			}
		}
	}), {
		get: function(e, t, n, i, s) {
			var r = e.endpoint;
			Faye.asyncEach(this._transports, function(o, a) {
				var c = o[0],
					u = o[1],
					h = e.endpoints[c] || r;
				return Faye.indexOf(n, c) >= 0 ? a() : Faye.indexOf(t, c) < 0 ? (u.isUsable(e, h, function() {}), a()) : void u.isUsable(e, h, function(t) {
					if (!t) return a();
					var n = u.hasOwnProperty("create") ? u.create(e, h) : new u(e, h);
					i.call(s, n)
				})
			}, function() {
				throw Error("Could not find a usable connection type for " + Faye.URI.stringify(r))
			})
		},
		register: function(e, t) {
			this._transports.push([e, t]), t.prototype.connectionType = e
		},
		_transports: []
	}), Faye.extend(Faye.Transport.prototype, Faye.Logging), Faye.extend(Faye.Transport.prototype, Faye.Timeouts), Faye.Event = {
		_registry: [],
		on: function(e, t, n, i) {
			var s = function() {
					n.call(i)
				};
			e.addEventListener ? e.addEventListener(t, s, !1) : e.attachEvent("on" + t, s), this._registry.push({
				_element: e,
				_type: t,
				_callback: n,
				_context: i,
				_handler: s
			})
		},
		detach: function(e, t, n, i) {
			for (var s, r = this._registry.length; r--;) s = this._registry[r], e && e !== s._element || t && t !== s._type || n && n !== s._callback || i && i !== s._context || (s._element.removeEventListener ? s._element.removeEventListener(s._type, s._handler, !1) : s._element.detachEvent("on" + s._type, s._handler), this._registry.splice(r, 1), s = null)
		}
	}, void 0 !== Faye.ENV.onunload && Faye.Event.on(Faye.ENV, "unload", Faye.Event.detach, Faye.Event), "object" != typeof JSON && (JSON = {}), function() {
		function f(e) {
			return 10 > e ? "0" + e : e
		}
		function quote(e) {
			return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
				var t = meta[e];
				return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + e + '"'
		}
		function str(e, t) {
			var n, i, s, r, o, a = gap,
				c = t[e];
			switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
			case "string":
				return quote(c);
			case "number":
				return isFinite(c) ? c + "" : "null";
			case "boolean":
			case "null":
				return c + "";
			case "object":
				if (!c) return "null";
				if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(c)) {
					for (r = c.length, n = 0; r > n; n += 1) o[n] = str(n, c) || "null";
					return s = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + a + "]" : "[" + o.join(",") + "]", gap = a, s
				}
				if (rep && "object" == typeof rep) for (r = rep.length, n = 0; r > n; n += 1)"string" == typeof rep[n] && (i = rep[n], s = str(i, c), s && o.push(quote(i) + (gap ? ": " : ":") + s));
				else for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (s = str(i, c), s && o.push(quote(i) + (gap ? ": " : ":") + s));
				return s = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + a + "}" : "{" + o.join(",") + "}", gap = a, s
			}
		}
		"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		});
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap, indent, meta = {
				"\b": "\\b",
				"	": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			},
			rep;
		Faye.stringify = function(e, t, n) {
			var i;
			if (gap = "", indent = "", "number" == typeof n) for (i = 0; n > i; i += 1) indent += " ";
			else "string" == typeof n && (indent = n);
			if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw Error("JSON.stringify");
			return str("", {
				"": e
			})
		}, "function" != typeof JSON.stringify && (JSON.stringify = Faye.stringify), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
			function walk(e, t) {
				var n, i, s = e[t];
				if (s && "object" == typeof s) for (n in s) Object.prototype.hasOwnProperty.call(s, n) && (i = walk(s, n), void 0 !== i ? s[n] = i : delete s[n]);
				return reviver.call(e, t, s)
			}
			var j;
			if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
				return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
			})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
				"": j
			}, "") : j;
			throw new SyntaxError("JSON.parse")
		})
	}(), Faye.Transport.WebSocket = Faye.extend(Faye.Class(Faye.Transport, {
		UNCONNECTED: 1,
		CONNECTING: 2,
		CONNECTED: 3,
		batching: !1,
		isUsable: function(e, t) {
			this.callback(function() {
				e.call(t, !0)
			}), this.errback(function() {
				e.call(t, !1)
			}), this.connect()
		},
		request: function(e) {
			this._pending = this._pending || new Faye.Set;
			for (var t = 0, n = e.length; n > t; t++) this._pending.add(e[t]);
			this.callback(function(t) {
				if (t) {
					var n = Faye.map(e, function(e) {
						return e.message
					});
					t.send(Faye.toJSON(n))
				}
			}, this), this.connect()
		},
		connect: function() {
			if (!Faye.Transport.WebSocket._unloaded && (this._state = this._state || this.UNCONNECTED, this._state === this.UNCONNECTED)) {
				this._state = this.CONNECTING;
				var e = this._createSocket();
				if (!e) return this.setDeferredStatus("failed");
				var t = this;
				e.onopen = function() {
					e.headers && t._storeCookies(e.headers["set-cookie"]), t._socket = e, t._state = t.CONNECTED, t._everConnected = !0, t._ping(), t.setDeferredStatus("succeeded", e)
				};
				var n = !1;
				e.onclose = e.onerror = function() {
					if (!n) {
						n = !0;
						var i = t._state === t.CONNECTED;
						e.onopen = e.onclose = e.onerror = e.onmessage = null, delete t._socket, t._state = t.UNCONNECTED, t.removeTimeout("ping"), t.setDeferredStatus("unknown");
						var s = t._pending ? t._pending.toArray() : [];
						delete t._pending, i ? t.handleError(s, !0) : t._everConnected ? t.handleError(s) : t.setDeferredStatus("failed")
					}
				}, e.onmessage = function(e) {
					var n, i = JSON.parse(e.data),
						s = [];
					if (i) {
						i = [].concat(i);
						for (var r = 0, o = i.length; o > r; r++) void 0 !== i[r].successful && (n = t._pending.remove(i[r]), n && s.push(n));
						t.receive(s, i)
					}
				}
			}
		},
		close: function() {
			this._socket && this._socket.close()
		},
		_createSocket: function() {
			var e = Faye.Transport.WebSocket.getSocketUrl(this.endpoint),
				t = {
					headers: Faye.copyObject(this._client.headers),
					ca: this._client.ca
				};
			return t.headers.Cookie = this._getCookies(), Faye.WebSocket ? new Faye.WebSocket.Client(e, [], t) : Faye.ENV.MozWebSocket ? new MozWebSocket(e) : Faye.ENV.WebSocket ? new WebSocket(e) : void 0
		},
		_ping: function() {
			this._socket && (this._socket.send("[]"), this.addTimeout("ping", this._client._advice.timeout / 2e3, this._ping, this))
		}
	}), {
		PROTOCOLS: {
			"http:": "ws:",
			"https:": "wss:"
		},
		create: function(e, t) {
			var n = e.transports.websocket = e.transports.websocket || {};
			return n[t.href] = n[t.href] || new this(e, t), n[t.href]
		},
		getSocketUrl: function(e) {
			return e = Faye.copyObject(e), e.protocol = this.PROTOCOLS[e.protocol], Faye.URI.stringify(e)
		},
		isUsable: function(e, t, n, i) {
			this.create(e, t).isUsable(n, i)
		}
	}), Faye.extend(Faye.Transport.WebSocket.prototype, Faye.Deferrable), Faye.Transport.register("websocket", Faye.Transport.WebSocket), Faye.Event && Faye.Event.on(Faye.ENV, "beforeunload", function() {
		Faye.Transport.WebSocket._unloaded = !0
	}), Faye.Transport.EventSource = Faye.extend(Faye.Class(Faye.Transport, {
		initialize: function(e, t) {
			if (Faye.Transport.prototype.initialize.call(this, e, t), !Faye.ENV.EventSource) return this.setDeferredStatus("failed");
			this._xhr = new Faye.Transport.XHR(e, t), t = Faye.copyObject(t), t.pathname += "/" + e._clientId;
			var n = new EventSource(Faye.URI.stringify(t)),
				i = this;
			n.onopen = function() {
				i._everConnected = !0, i.setDeferredStatus("succeeded")
			}, n.onerror = function() {
				i._everConnected ? i._client.messageError([]) : (i.setDeferredStatus("failed"), n.close())
			}, n.onmessage = function(e) {
				i.receive([], JSON.parse(e.data))
			}, this._socket = n
		},
		close: function() {
			this._socket && (this._socket.onopen = this._socket.onerror = this._socket.onmessage = null, this._socket.close(), delete this._socket)
		},
		isUsable: function(e, t) {
			this.callback(function() {
				e.call(t, !0)
			}), this.errback(function() {
				e.call(t, !1)
			})
		},
		encode: function(e) {
			return this._xhr.encode(e)
		},
		request: function(e) {
			this._xhr.request(e)
		}
	}), {
		isUsable: function(e, t, n, i) {
			var s = e._clientId;
			return s ? void Faye.Transport.XHR.isUsable(e, t, function(s) {
				return s ? void this.create(e, t).isUsable(n, i) : n.call(i, !1)
			}, this) : n.call(i, !1)
		},
		create: function(e, t) {
			var n = e.transports.eventsource = e.transports.eventsource || {},
				i = e._clientId;
			t = Faye.copyObject(t), t.pathname += "/" + (i || "");
			var s = Faye.URI.stringify(t);
			return n[s] = n[s] || new this(e, t), n[s]
		}
	}), Faye.extend(Faye.Transport.EventSource.prototype, Faye.Deferrable), Faye.Transport.register("eventsource", Faye.Transport.EventSource), Faye.Transport.XHR = Faye.extend(Faye.Class(Faye.Transport, {
		encode: function(e) {
			var t = Faye.map(e, function(e) {
				return e.message
			});
			return Faye.toJSON(t)
		},
		request: function(e) {
			var t = this.endpoint.path,
				n = Faye.ENV.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest,
				i = this;
			n.open("POST", t, !0), n.setRequestHeader("Content-Type", "application/json"), n.setRequestHeader("Pragma", "no-cache"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			var s = this._client.headers;
			for (var r in s) s.hasOwnProperty(r) && n.setRequestHeader(r, s[r]);
			var o = function() {
					n.abort()
				};
			Faye.Event.on(Faye.ENV, "beforeunload", o), n.onreadystatechange = function() {
				if (n && 4 === n.readyState) {
					var t = null,
						s = n.status,
						r = n.responseText,
						a = s >= 200 && 300 > s || 304 === s || 1223 === s;
					if (Faye.Event.detach(Faye.ENV, "beforeunload", o), n.onreadystatechange = function() {}, n = null, !a) return i.handleError(e);
					try {
						t = JSON.parse(r)
					} catch (c) {}
					t ? i.receive(e, t) : i.handleError(e)
				}
			}, n.send(this.encode(e))
		}
	}), {
		isUsable: function(e, t, n, i) {
			n.call(i, Faye.URI.isSameOrigin(t))
		}
	}), Faye.Transport.register("long-polling", Faye.Transport.XHR), Faye.Transport.CORS = Faye.extend(Faye.Class(Faye.Transport, {
		encode: function(e) {
			var t = Faye.map(e, function(e) {
				return e.message
			});
			return "message=" + encodeURIComponent(Faye.toJSON(t))
		},
		request: function(e) {
			var t, n = Faye.ENV.XDomainRequest ? XDomainRequest : XMLHttpRequest,
				i = new n,
				s = this._client.headers,
				r = this;
			if (i.open("POST", Faye.URI.stringify(this.endpoint), !0), i.setRequestHeader) {
				i.setRequestHeader("Pragma", "no-cache");
				for (t in s) s.hasOwnProperty(t) && i.setRequestHeader(t, s[t])
			}
			var o = function() {
					return i ? (i.onload = i.onerror = i.ontimeout = i.onprogress = null, void(i = null)) : !1
				};
			i.onload = function() {
				var t = null;
				try {
					t = JSON.parse(i.responseText)
				} catch (n) {}
				o(), t ? r.receive(e, t) : r.handleError(e)
			}, i.onerror = i.ontimeout = function() {
				o(), r.handleError(e)
			}, i.onprogress = function() {}, i.send(this.encode(e))
		}
	}), {
		isUsable: function(e, t, n, i) {
			if (Faye.URI.isSameOrigin(t)) return n.call(i, !1);
			if (Faye.ENV.XDomainRequest) return n.call(i, t.protocol === Faye.ENV.location.protocol);
			if (Faye.ENV.XMLHttpRequest) {
				var s = new Faye.ENV.XMLHttpRequest;
				return n.call(i, void 0 !== s.withCredentials)
			}
			return n.call(i, !1)
		}
	}), Faye.Transport.register("cross-origin-long-polling", Faye.Transport.CORS), Faye.Transport.JSONP = Faye.extend(Faye.Class(Faye.Transport, {
		encode: function(e) {
			var t = Faye.map(e, function(e) {
				return e.message
			}),
				n = Faye.copyObject(this.endpoint);
			return n.query.message = Faye.toJSON(t), n.query.jsonp = "__jsonp" + Faye.Transport.JSONP._cbCount + "__", Faye.URI.stringify(n)
		},
		request: function(e) {
			var t = Faye.map(e, function(e) {
				return e.message
			}),
				n = document.getElementsByTagName("head")[0],
				i = document.createElement("script"),
				s = Faye.Transport.JSONP.getCallbackName(),
				r = Faye.copyObject(this.endpoint),
				o = this;
			r.query.message = Faye.toJSON(t), r.query.jsonp = s, Faye.ENV[s] = function(t) {
				if (!Faye.ENV[s]) return !1;
				Faye.ENV[s] = void 0;
				try {
					delete Faye.ENV[s]
				} catch (n) {}
				i.parentNode.removeChild(i), o.receive(e, t)
			}, i.type = "text/javascript", i.src = Faye.URI.stringify(r), n.appendChild(i)
		}
	}), {
		_cbCount: 0,
		getCallbackName: function() {
			return this._cbCount += 1, "__jsonp" + this._cbCount + "__"
		},
		isUsable: function(e, t, n, i) {
			n.call(i, !0)
		}
	}), Faye.Transport.register("callback-polling", Faye.Transport.JSONP)
}();
//@ sourceMappingURL=faye-browser-min.js.map