<template>
  <el-tooltip effect="dark" placement="top">
    <div slot="content" class="helper-tip-content">
      <slot>{{ content }}</slot>
    </div>
    <span class="helper-tips"></span>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    content: String // 提示文案
  }
}
</script>
<style lang="less">
.d-tree-form {
  .helper-tips-content {
    max-width: 270px;
    text-align: justify;
  }

  .helper-tips {
    color: #cacbce;
    text-align: center;
    // position: absolute;
    display: inline-block;
    width: 14px;
    position: relative;
    margin-top: 8px;
    margin-left: 0;
    height: 14px;
    cursor: pointer;

    &::before {
      content: '?';
      display: inline-block;
      top: 2px;
      left: 0;
      width: 28px;
      position: absolute;
      font-size: 16px;
      line-height: 16px;
      transform-origin: center left;
      transform: scale(0.5);
    }

    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 3px;
      left: 0;
      border-radius: 50%;
      border: 1px solid #cacbce;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
