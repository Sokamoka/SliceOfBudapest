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
        :is-loading="isLoading"
      ></control-textarea>
    </a>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ControlTextarea from '@/components/form-controls/control-textarea';

export default {
  components: {
    ControlTextarea
  },
  props: {
    value: {
      type: String
    }
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  data() {
    return {
      // comment: '',
      isLoading: false
    };
  },
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
    // comment() {
    //   return this.value;
    // }
  },
  methods: {
    ...mapActions('properties', ['saveComment']),
    async changeComment() {
      // console.log(this.$route.params.id);
      this.isLoading = true;
      await this.saveComment({
        id: this.$route.params.id,
        comment: this.comment
      });
      this.isLoading = false;
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
