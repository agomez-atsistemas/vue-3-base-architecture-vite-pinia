<template>
  <div v-if="type !== null && message !== null" class="UserMessage">
    <errorSVG v-if="type === error" class="icon error" />
    <infoSVG v-else class="icon info" />
    <p>{{ message }}</p>
    <closeSVG v-if="type=== error" class="icon" id="closeIcon" @click="handleClose" />
  </div>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue';
  import { useUserMessageStore , UserMessageType } from '@/store/userMessage';
  import errorSVG from '@/assets/icons/error.svg';
  import infoSVG from '@/assets/icons/info.svg';
  import closeSVG from '@/assets/icons/close.svg';

  const userMessageStore = useUserMessageStore();

  const type = computed(() => userMessageStore.type);
  const message = computed(() => userMessageStore.message);

  const { info, error } = UserMessageType;

  watchEffect(() => {
    if (type.value === info) {
      setTimeout(() => {
        userMessageStore.clearUserMessage();
      }, 2000);
    }
  });

  const handleClose = () => userMessageStore.clearUserMessage();
</script>

<style scoped lang="scss">
.UserMessage {
  position: fixed;
  left: 50%;
  bottom: 4vmin;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  padding: 12px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.9);

  button {
    flex: 0 0 auto;
    height: 1.5em;
    width: 1.5em;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: var(--main-fg-color);
    font-weight: bold;
    cursor: pointer;

    .icon {
      padding: 0;
      height: 100%;
    }
  }

  p {
    flex: 1 1 auto;
    margin: 0;
  }

  .icon {
    flex: 0 0 auto;
    padding: 8px 16px 8px 8px;
    fill: var(--main-fg-color);

    &.error {
      fill: var(--error-color);
    }

    &.info {
      fill: var(--info-color);
    }
  }
}
</style>
