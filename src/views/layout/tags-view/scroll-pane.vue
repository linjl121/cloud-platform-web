<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
  const tagAndTagSpacing = 4; // tagAndTagSpacing

  export default {
    name: 'ScrollPane',
    data() {
      return {
        left: 0
      };
    },
    computed: {
      scrollWrapper() {
        return this.$refs.scrollContainer.$refs.wrap;
      }
    },
    mounted() {
      this.scrollWrapper.addEventListener('scroll', this.emitScroll, true);
    },
    beforeDestroy() {
      this.scrollWrapper.removeEventListener('scroll', this.emitScroll);
    },
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40;
        const $scrollWrapper = this.scrollWrapper;
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
      },
      emitScroll() {
        this.$emit('scroll');
        const $scrollWrapper = this.scrollWrapper;
        const { scrollLeft, scrollWidth, offsetWidth } = $scrollWrapper;
        let maxScrollLeft = scrollWidth - offsetWidth;
        this.emitChangeScrollStatus(scrollLeft, maxScrollLeft);
      },
      // 处理左右是否可以滚动按钮事件
      emitChangeScrollStatus(scrollLeft, maxScrollLeft) {
        this.$emit('change-scoll-status', {
          leftDisabled: scrollLeft === 0,
          rightDisabled: scrollLeft === maxScrollLeft
        });
      },
      moveToRight(len = 400) {
        const $scrollWrapper = this.scrollWrapper;
        const { scrollLeft, scrollWidth, offsetWidth } = $scrollWrapper;
        let tempScrollLeft = scrollLeft + len;
        let maxScrollLeft = scrollWidth - offsetWidth;

        tempScrollLeft = tempScrollLeft > maxScrollLeft ? maxScrollLeft : tempScrollLeft;

        $scrollWrapper.scrollLeft = tempScrollLeft;
        this.emitChangeScrollStatus($scrollWrapper.scrollLeft, maxScrollLeft);
      },
      moveToLeft(len = 400) {
        const $scrollWrapper = this.scrollWrapper;
        const { scrollLeft, scrollWidth, offsetWidth } = $scrollWrapper;
        let tempScrollLeft = scrollLeft - len;
        let maxScrollLeft = scrollWidth - offsetWidth;

        tempScrollLeft = tempScrollLeft < 0 ? 0 : tempScrollLeft;

        $scrollWrapper.scrollLeft = tempScrollLeft;
        this.emitChangeScrollStatus($scrollWrapper.scrollLeft, maxScrollLeft);
      },
      initScroll() {
        const $scrollWrapper = this.scrollWrapper;
        const { scrollLeft, scrollWidth, offsetWidth } = $scrollWrapper;
        let maxScrollLeft = scrollWidth - offsetWidth;
        console.log(scrollLeft, offsetWidth, maxScrollLeft);
        this.emitChangeScrollStatus(scrollLeft, maxScrollLeft);
      },
      moveToTarget(currentTag) {
        const $container = this.$refs.scrollContainer.$el;
        const $containerWidth = $container.offsetWidth;
        const $scrollWrapper = this.scrollWrapper;
        const tagList = this.$parent.$refs.tag;
        const { scrollWidth, offsetWidth } = $scrollWrapper;
        let maxScrollLeft = scrollWidth - offsetWidth;

        let firstTag = null;
        let lastTag = null;

        // find first tag and last tag
        if (tagList.length > 0) {
          firstTag = tagList[0];
          lastTag = tagList[tagList.length - 1];
        }

        if (firstTag === currentTag) {
          $scrollWrapper.scrollLeft = 0;
        } else if (lastTag === currentTag) {
          $scrollWrapper.scrollLeft = scrollWidth - $containerWidth;
        } else {
          // find preTag and nextTag
          const currentIndex = tagList.findIndex((item) => item === currentTag);
          const prevTag = tagList[currentIndex - 1];
          const nextTag = tagList[currentIndex + 1];

          // the tag's offsetLeft after of nextTag
          const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

          // the tag's offsetLeft before of prevTag
          const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

          if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
          }
        }

        this.emitChangeScrollStatus($scrollWrapper.scrollLeft, maxScrollLeft);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    ::v-deep {
      .el-scrollbar__bar {
        bottom: 0px;
      }
    }
  }
</style>
