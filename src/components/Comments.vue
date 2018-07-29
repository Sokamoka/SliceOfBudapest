<template>
  <nav class="panel">
    <p class="panel-heading">
      Comments
    </p>
    <p class="panel-tabs">
      <a class="is-active">Comment</a>
      <a>Contacts</a>
    </p>
    <a class="panel-block">
      <control-textarea
        v-model="comment"
        placeholder="Comment"
        :rows="10"
        @change="changeComment"
        :is-loading="isSaveing"
      ></control-textarea>
    </a>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import ControlTextarea from '@/components/form-controls/control-textarea';

export default {
  components: {
    ControlTextarea
  },
  props: {
    value: {
      type: String
    },
    isSaveing: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  // data() {
  //   return {};
  // },
  computed: {
    ...mapGetters('properties', ['getProperty']),
    comment: {
      get() {
        return this.getProperty[0] ? this.getProperty[0].comment : '';
      },
      set(value) {
        this.$store.commit('properties/updateComment', value);
      }
    }
  },
  methods: {
    changeComment() {
      this.$emit('change', {
        id: this.$route.params.id,
        comment: this.comment
      });
    }
  }
};
</script>
<style lang="scss">
.panel-block {
  .field {
    width: 100%;
  }
}
</style>
