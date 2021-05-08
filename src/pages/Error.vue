<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        {{ code }}
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ errorMessage }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        label="Go Home"
        no-caps
        text-color="blue"
        to="/"
        unelevated
      />
    </div>
  </div>
</template>

<script lang="ts">
import { errorMessages } from 'src/router/modules/oidc-routes';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
  props: {
    code: {
      type: String,
      default: '404'
    }
  },
  setup(props) {
    const errorMessage = errorMessages[props.code];

    return { errorMessage };
  }
});
</script>
