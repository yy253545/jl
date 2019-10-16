<template>
	<div id="showMessage" class="posFix cenMid" :style="{backgroundImage:'url('+require('../imgs/dialogBgImg.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%'}">
		<div class="tit_box posRel">
			<span class="posAbs cenMid">{{form_data.title}}</span>
			<img :src="closeImg" alt class="closeImg posAbs mid" @click="clickMask">
		</div>

		<div v-if="form_data.checkNumber_show" class="inputBox flex flexSta">
			<em>*</em>
			<span id="">
				{{form_data.checkNumber_tit}}:
			</span>
			<el-select v-model="yzType" @change="checkNumber" filterable placeholder="请选择">
				<el-option v-for="item in checkNumberData" :key="item.key" :label="item.value" :value="item.key">
				</el-option>
			</el-select>
		</div>
		<!--需要验证的信息模块-->
		<div v-if="form_data.number_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.number_tit}}:
			</span>
			<input v-model="yzNumber" type="text" name="" id="" value="" />
		</div>
		<!--验证码模块-->
		<div v-if="form_data.yzm_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.yzm_tit}}:
			</span>
			<input style="width:21%;" v-model="yzmVal" type="text" name="yzmVal" id="" value="" />
			<div class="identifyBox flex flexAro" @click="refreshCode" style="margin-left:10%">
				<codecanvas :identifyCode="identifyCode"></codecanvas>
			</div>
		</div>
		<!--所属游戏模块-->
		<div v-if="form_data.app_id_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.app_id_tit}}:
			</span>
			<el-select v-model="form_data.app_id" @change="changeGame" filterable placeholder="请选择">
				<el-option v-for="item in allGame" :key="item.key" :label="item.value" :value="item.key">
				</el-option>
			</el-select>
		</div>
		<!--所在区服模块-->
		<div v-if="form_data.server_name_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.server_name_tit}}:
			</span>
			<input v-model="formData.server_name" type="text" name="" id="" value="" />
		</div>
		<!--角色名模块-->
		<div v-if="form_data.role_name_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.role_name_tit}}:
			</span>
			<input v-model="formData.role_name" type="text" name="" id="" value="" />
		</div>
		<!--举报角色名模块-->
		<div v-if="form_data.report_name_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.report_name_tit}}:
			</span>
			<input v-model="formData.report_name" type="text" name="" id="" value="" />
		</div>
		<!--充值时间模块-->
		<div v-if="form_data.happen_time_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.happen_time_tit}}:
			</span>
			<el-date-picker v-model="formData.happen_time" type="datetime" placeholder="选择日期时间">
			</el-date-picker>
		</div>
		<!--游戏设备mok-->
		<div v-if="form_data.device_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.device_tit}}:
			</span>
			<input v-model="formData.device_type" type="text" name="" id="" value="" />
		</div>
		<!--手机号模块-->
		<div v-if="form_data.mobile_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.mobile_tit}}:
			</span>
			<input v-model="formData.mobile" type="text" name="" id="" value="" />
		</div>
		<!--qq号模块-->
		<div v-if="form_data.qq_show" class="inputBox flex flexSta">
			<em></em>

			<span id="">
				{{form_data.qq_tit}}:
			</span>
			<input v-model="formData.qq" type="text" name="" id="" value="" />
		</div>
		<!--邮箱模块-->
		<div v-if="form_data.email_show" class="inputBox flex flexSta">
			<em></em>

			<span id="">
				{{form_data.email_tit}}:
			</span>
			<input v-model="formData.email" type="text" name="" id="" value="" />
		</div>
		<!--详细描述模块-->
		<div v-if="form_data.description_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				{{form_data.description_tit}}:
			</span>
			<textarea name="" rows="" cols="" v-model="formData.description"></textarea>
		</div>
		<!--上传图片模块-->
		<div v-if="form_data.image_show" class="inputBox flex flexSta">
			<em>*</em>

			<span id="">
				上传图片：
			</span>
			<!--<input name="myFile" type="file" @change="selectImg" id="imgLocal">-->
			<input type="file" name="imgLocal" id="imgLocal" value="" @change="selectImg" /><label class="label" for="imgLocal">上传图片</label>
			<img v-if="upLoadSrc" :src="upLoadSrc" class="upLoadSrc" />
			<!--<el-upload class="upload-demo" action="/Wap/api/uploadFile" :before-upload="beforeUpload" ref="newupload" :on-change="newhandleChange" :auto-upload="false" accept=".mp4,.flv,.mov" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="2" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>-->
		</div>
		<!--上传视频模块-->
		<div v-if="form_data.video_show" class="inputBox flex flexSta">
			<em></em>

			<span id="">
				上传视频：
			</span>
			<!--<input name="myFile" type="file" @change="selectImg" id="imgLocal">-->
			<input type="file" name="videoLocal" id="videoLocal" value="" @change="selectVideo" /><label class="label" for="videoLocal">上传视频</label>
			<!--<img v-if="upLoadSrc" :src="upLoadSrc" class="upLoadSrc" />-->
			<video v-if="upLoadVideo" width="" height="80" autoplay loop>
				<source :src="upLoadVideo" type="video/mp4">
				</source>
				<source :src="upLoadVideo" type="video/ogg">
				</source>
				<source :src="upLoadVideo" type="video/webm">
				</source>
				<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
					<param name="movie" value="myvideo.swf" />
					<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
				</object> 当前浏览器不支持 video直接播放，点击这里下载视频：
				<a href="myvideo.webm">下载视频</a>
			</video>
			<!--<el-upload class="upload-demo" action="/Wap/api/uploadFile" :before-upload="beforeUpload" ref="newupload" :on-change="newhandleChange" :auto-upload="false" accept=".mp4,.flv,.mov" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="2" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>-->
		</div>
		<span class="warningSp">
			为了尽快处理您的反馈，带*是必填项！
		</span>

		<span v-if="form_data.yzBtn_show" class="button" @click="yzBtnFun">立即验证</span>
		<span v-else class="button" @click="submitFun">提交</span>
	</div>
</template>

<script>
	import codecanvas from "./commons/code";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import utils from "../config/common.js";
	import closeMd from "./closeMd";

	export default {
		name: "showMessage",
		props: {
			form_data: {

			},
			allGame: {}
		},
		components: {
			closeMd,
			codecanvas
		},
		data() {
			return {
				formData: {
					type: "", //反馈类型
					//                  user_name: "", //玩家游戏账号
					app_id: "", //游戏名字
					server_name: "", //游戏区服
					role_name: "", //角色名字
					res1: "", //上传图片
					res2: "", //上传的视频
					mobile: "", //手机号
					qq: "", //qq号
					email: "", //邮箱
					description: "", //描述
					device_type: "", //游戏设备
					report_name: "", //举报角色名称
					happen_time: "", //发生的时间
				},

				upLoadData: {},
				fileList: [],
				upLoadSrc: "",
				upLoadVideo: "",
				closeImg: require("../imgs/close.png"),
				checkNumberData: [{
					'key': "1",
					'value': "微信公众号"
				}, {
					'key': "2",
					'value': "官方qq群"
				}, {
					'key': "3",
					'value': "客服QQ"
				}, {
					'key': "4",
					'value': "客服电话"
				}],
				yzType: "",
				yzNumber: "",
				yzmVal: "",
				checkCode: "QFYX",
				identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
				identifyCode: ""
			};
		},
		beforeCreate: function() {},
		created: function() {},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.identifyCode = "";
			that.makeCode(that.identifyCodes, 4);
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		methods: {
			randomNum: function(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode: function() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode: function(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
				//   console.log(this.identifyCode);
			},
			clickMask: function() {
				var that = this;
				//              console.log('点击了关闭按钮');
				that.$emit("clickMask");
			},
			changeGame: function(val) {
				var that = this;
				//              console.log(val);
				that.formData["app_id"] = val;
			},
			checkNumber: function(val) {
				var that = this;
				//              console.log(val);
				that.formData["checkNumber"] = val;
			},
			selectImg: function() {
				let that = this;
				let imgFile = document.querySelector('#imgLocal').files[0]; //取到上传的图片
				//              console.log(imgFile);

				if (imgFile.type.split("/")[0] != 'image') { //上传的不是图片
					that.$confirm('只能上传图片', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {

					}).catch(() => {

					});
				} else {
					if (imgFile.size / 1024 / 1024 > 4) {
						that.$confirm('文件大小不能大于4M', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							type: 'warning',
							center: true
						}).then(() => {

						}).catch(() => {

						});
					} else {
						let image = new FormData(); //通过formdata上传
						image.append('upFile', imgFile);
						var value = that.$store.getters.mdVal;
						var is_android = that.$store.getters.is_android;
						var device = is_android ? "android" : "ios";

						var checkUserLogin_params = {
							device: device,
							time: Date.parse(new Date()) + ""
						};

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + value);
							params["access"] = access;
							return params;
						}

						var checkUserLogin_params_data = mdjm_fun(checkUserLogin_params);
						//                  console.log(checkUserLogin_params_data);
						image.append("device", checkUserLogin_params_data.device);
						image.append("time", checkUserLogin_params.time);
						image.append("access", checkUserLogin_params.access);
						//                  console.log(image);

						that.$axios
							.post("/Wap/api/uploadFile", image, {
								headers: {
									"Content-Type": "multipart/form-data"
								}
							})
							.then(function(res) {
								if (res.data.status == 0) {
									that.$confirm(res.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showCancelButton: false,
										showClose: false,
										closeOnClickModal: false,
										type: 'warning',
										center: true
									}).then(() => {

									}).catch(() => {

									});
								} else if (res.data.status == "1") {
									var src = res.data.data;
									that.upLoadSrc = src;
									//                                  console.log(encodeURIComponent(src));
									that.formData.res1 = encodeURIComponent(src);
									//                                  console.log(that.formData);
									that.$confirm(res.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showCancelButton: false,
										showClose: false,
										closeOnClickModal: false,
										type: 'info',
										center: true
									}).then(() => {

									}).catch(() => {

									});
								}
							})
							.catch(function() {
								// console.log("FAILURE!!");
							});
					}
				}
			},
			selectVideo: function() {
				let that = this;
				let imgFile = document.querySelector('#videoLocal').files[0]; //取到上传的图片
				//              console.log(imgFile);
				if (imgFile.type.split("/")[0] != 'video') {
					that.$confirm('只能上传视频', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {

					}).catch(() => {

					});
				} else {
					if (imgFile.size / 1024 / 1024 > 20) {
						that.$confirm('文件大小不能大于4M', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							type: 'warning',
							center: true
						}).then(() => {

						}).catch(() => {

						});
					} else {
						let image = new FormData(); //通过formdata上传
						image.append('upFile', imgFile);

						var value = that.$store.getters.mdVal;
						var is_android = that.$store.getters.is_android;
						var device = is_android ? "android" : "ios";

						var checkUserLogin_params = {
							device: device,
							time: Date.parse(new Date()) + ""
						};

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + value);
							params["access"] = access;
							return params;
						}

						var checkUserLogin_params_data = mdjm_fun(checkUserLogin_params);
						//                  console.log(checkUserLogin_params_data);
						image.append("device", checkUserLogin_params_data.device);
						image.append("time", checkUserLogin_params.time);
						image.append("access", checkUserLogin_params.access);
						//                  console.log(image);

						that.$axios
							.post("/Wap/api/uploadFile", image, {
								headers: {
									"Content-Type": "multipart/form-data"
								}
							})
							.then(function(res) {
								if (res.data.status == 0) {
									that.$confirm(res.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showCancelButton: false,
										showClose: false,
										closeOnClickModal: false,
										type: 'warning',
										center: true
									}).then(() => {

									}).catch(() => {

									});
								} else if (res.data.status == "1") {
									var src = res.data.data;
									that.upLoadVideo = src;
									that.formData.res2 = encodeURIComponent(src);
									//                                  console.log(that.formData);
									that.$confirm(res.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showCancelButton: false,
										showClose: false,
										closeOnClickModal: false,
										type: 'info',
										center: true
									}).then(() => {

									}).catch(() => {

									});
								}
							})
							.catch(function() {
								// console.log("FAILURE!!");
							});
					}
				}
			},
			beforeUpload: function(file) {
				var that = this;
				console.log(file);
				let image = new FormData(); //通过formdata上传
				image.append('upFile', file);

				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";

				var checkUserLogin_params = {
					device: device,
					time: Date.parse(new Date()) + ""
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + value);
					params["access"] = access;
					return params;
				}

				var checkUserLogin_params_data = mdjm_fun(checkUserLogin_params);
				console.log(checkUserLogin_params_data);
				image.append("device", checkUserLogin_params_data.device);
				image.append("time", checkUserLogin_params.time);
				image.append("access", checkUserLogin_params.access);
				console.log(image);
				that.$axios
					.post("/Wap/api/uploadFile", image, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
					.then(function(res) {
						console.log(res.data);
						if (res.data.status == 0) {
							that.$confirm(res.data.msg, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (res.data.status == "1") {
							var src = res.data.data;
							that.upLoadSrc = src;
							console.log(that.upLoadSrc);
							that.$confirm(res.data.msg, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'info',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						}
					})
					.catch(function() {
						// console.log("FAILURE!!");
					});
				return true
			},
			newhandleChange() {
				this.$refs.newupload.submit();
			},
			yzBtnFun: function() { //验证的方法
				var that = this;
				//              console.log(that.yzmVal.toLowerCase(), that.identifyCode.toLowerCase());

				var yzParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					type: that.yzType + "",
					number: that.yzNumber + "",
				}

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}

				if (that.yzType == "" || that.yzNumber == "" || that.yzmVal == "") {
					that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {

					}).catch(() => {

					});
				} else if (that.yzmVal.toLowerCase() != that.identifyCode.toLowerCase()) {
					that.$confirm('验证码填写错误!', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {

					}).catch(() => {

					});
				} else {
					that.refreshCode();
					that
						.$axios({
							method: "post",
							url: "/Wap/api/checkNumber",
							data: QS.stringify(mdjm_fun(yzParams))
						})
						.then(function(response) {
							//                      console.log(response.data);
							if (response.data.status == 0) {
								//请求不成功
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'warning',
									center: true
								}).then(() => {

								}).catch(() => {

								});
							} else if (response.data.status == 1) {
								//请求成功
								//                          console.log('提交成功');
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'info',
									center: true
								}).then(() => {
									that.$emit("submitSuccess");
								}).catch(() => {

								});
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
				}
			},
			submitFun: function() { //提交方法
				var that = this;
				that.formData['device'] = that.$store.getters.is_android ? "android" : "ios";
				that.formData['time'] = Date.parse(new Date()) + "";
				that.formData['type'] = that.form_data['type'];

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}
				let formData = that.formData;
				let happen_time = formData.happen_time;
				var dateee = new Date(happen_time).toJSON();
				var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
				formData.happen_time = date;
				that.formData = formData;
				switch (that.formData['type']) {
					case '1': //充值未到账
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.happen_time ==
							"" || formData.mobile == "" || formData.description == "" || formData.res1 == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '2': //bug反馈
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.device_type ==
							"" || formData.mobile == "" || formData.description == "" || formData.res1 == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '3': //建议反馈
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.mobile == "" ||
							formData.description == "" || formData.res1 == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '4': //广告举报
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.report_name ==
							"" || formData.mobile == "" || formData.description == "" || formData.res1 == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '5': //专属管家
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.mobile == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm('清风客服团队将尽快为您配备专属管家并通知其主动与您联系。在游戏中遇到的任何问题皆可向您的专属管家寻求解决！', '感谢您的提交!', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '6': //充值返利
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.mobile == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm('清风客服团队将尽快与您取得联系。', '感谢您的提交!', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					case '7': //充值返利
						if (formData.app_id == "" || formData.server_name == "" || formData.user_name == "" || formData.mobile == "") {
							that.$confirm('为了能尽快解决您的反馈问题，带*的是必填项！', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else if (!utils.is_tel(formData.mobile)) { //手机号格式错误
							that.$confirm('手机号格式错误,请重新填写', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {

							}).catch(() => {

							});
						} else {
							that
								.$axios({
									method: "post",
									url: "/Wap/api/reportProblem",
									data: QS.stringify(mdjm_fun(that.formData))
								})
								.then(function(response) {
									//                      console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										that.$confirm(response.data.msg, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.push({
												name: "mine"
											})
										}).catch(() => {

										});
									} else if (response.data.status == 1) {
										//请求成功
										//                          console.log('提交成功');
										that.$confirm('清风客服团队将尽快与您取得联系。', '感谢您的提交!', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'info',
											center: true
										}).then(() => {
											that.$emit("submitSuccess")
										}).catch(() => {

										});
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
						break;
					default:
						break;
				}
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			}
		},
		computed: {}
	};
</script>
<style scoped lang="less">
	#showMessage {
		width: 90%;
		/*max-height: 90%;*/
		overflow: auto;
		z-index: 1500;
		padding: 0.3rem 0rem;

		.warningSp {
			width: 100%;
			text-align: center;
			font-size: 0.24rem;
			color: #ffbf00;
			line-height: 0.4rem;
		}

		.button {
			width: 3rem;
			height: 0.5rem;
			background: #ffbf00;
			text-align: center;
			font-size: 0.3rem;
			color: #FFFFFF;
			line-height: 0.5rem;
			margin: 0.3rem auto 0rem;
			border-radius: 3px;
		}

		.tit_box {
			width: 100%;
			min-height: 0.75rem;
			border-bottom: .02rem solid #e6e6e6;

			span {
				font-size: 0.3rem;
				font-weight: 600;
				color: #ffbf00;
				width: 75%;
				text-align: center;
			}

			.closeImg {
				width: 0.5rem;
				height: 0.5rem;
				right: 0.2rem;
				z-index: 1502;
			}
		}

		.inputBox {
			width: 100%;
			margin: 0.3rem 0rem;
			padding: 0 0.5rem;

			.el-radio {
				display: flex;
			}

			.el-radio__label {
				color: #fff;
			}

			.el-select {
				width: 70%;
				/*border: 1px solid #ffbf00;*/
			}

			.el-date-editor {
				width: 70%;
			}

			em {
				width: 3%;
				color: #ffbf00;
			}

			span {
				width: 27%;
				font-size: 0.3rem;
				color: #333333;
			}

			textarea {
				width: 70%;
				height: 2rem;
				font-size: 0.26rem;
				color: #333333;
				padding: 0.15rem;
				line-height: 0.32rem;
			}

			input {
				/*border: 1px solid #ffbf00;*/
				outline: none;
				width: 70%;
				height: 0.5rem;
				font-size: 0.26rem;
				color: #333333;
			}

			#imgLocal,
			#videoLocal {
				border: none;
				outline: none;
				width: 0;
				height: 0;
				display: none;
			}

			.label {
				font-size: 0.26rem;
				color: #FFFFFF;
				padding: 0.02rem;
				background: #ffbf00;
			}

			.upLoadSrc {
				width: auto;
				height: 0.8rem;
				margin-left: 1rem;
			}

			video {
				margin-left: 1rem;
			}
		}
	}
</style>
