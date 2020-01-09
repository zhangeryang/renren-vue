<template>
	<div class="box">
		<UE :defaultMsg="content" id="editor" ref="ue"></UE>
	</div>
</template>

<script>
	import UE from '../components/ueditor.vue'
	export default {
		data() {
			return {
				content: 'hello world'
			}
		},
		methods: {},
		components: {
			UE
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		border: 1px solid #eee;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	}

	.alert {
		width: 1018px;
		margin: 20px 20px 0 20px;
	}
</style>
