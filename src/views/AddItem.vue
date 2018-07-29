<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              {{ $t('titles.add-new-property') }}
          </h1>
          <h2 class="subtitle">
              {{ $t("message.hello") }}
          </h2>
          </div>
      </div>
    </section>
    <div class="container">
      <section class="section-progress">
        <progress class="progress is-primary is-large" :value="currentStep+1" :max="maxStep">1/5</progress>
      </section>
      <error :on-error="onError" @close="offError"></error>
      <transition :name="taransitionDirection" mode="out-in">
        <component
          :is="currentStepComponent"
          :step="currentStep"
          :max-step="maxStep"
          :button-labels="currentButtonLabels"
          :save-in-progress="saveInProgress"
          @step-next="stepNext"
          @step-prev="stepPrev"
          @on-complete="submitProperty"
        ></component>
      </transition>  

    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Error from '@/components/Error.vue';

import BaseData from './addItems/BaseData';
import Address from './addItems/Address';
import AddImages from './addItems/AddImages';
import MoreDetails from './addItems/MoreDetails';
import Description from './addItems/Description';

export default {
  name: 'AddItem',
  components: {
    Error,
    BaseData,
    Address,
    AddImages,
    MoreDetails,
    Description
  },
  data() {
    return {
      steps: ['BaseData', 'Address', 'AddImages', 'MoreDetails', 'Description'],
      transitionDirections: ['step-next-transition', 'step-prev-transition'],
      taransitionDirection: null,
      stepObjects: ['base', 'address', 'details', 'description'],
      buttonLabels: [
        {
          next: 'Cím megadása'
        },
        {
          prev: 'Alapadatok megadása',
          next: 'Képek feltöltésea'
        },
        {
          prev: 'Cím megadása',
          next: 'További adatok megadása'
        },
        {
          prev: 'Képek feltöltése',
          next: 'Leírás megadása'
        },
        {
          prev: 'További adatok megadása',
          next: 'Mentés'
        }
      ],
      currentStep: 0,
      isOnOffer: true,
      saveInProgress: false
    };
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('property', ['property']),
    ...mapGetters('property', ['onError']),
    currentStepComponent() {
      return this.steps[this.currentStep];
    },
    maxStep() {
      return this.steps.length;
    },
    currentButtonLabels() {
      return this.buttonLabels[this.currentStep];
    }
  },
  methods: {
    ...mapActions('property', [
      'addProperty',
      'resetStateProperty',
      'offError'
    ]),
    async submitProperty() {
      this.saveInProgress = true;
      await this.addProperty(this.property);
      this.saveInProgress = false;
      this.$toasted.show('Properties Added!').goAway(3000);
      this.currentStep = 0;
      this.resetStateProperty();
    },
    stepNext() {
      this.taransitionDirection = this.transitionDirections[0];
      this.currentStep++;
    },
    stepPrev() {
      this.taransitionDirection = this.transitionDirections[1];
      this.currentStep--;
    }
  }
};
</script>
<style lang="scss">
.section-progress {
  margin-top: 30px;
  margin-bottom: 10px;

  .progress::-webkit-progress-value {
    transition: width 0.5s ease;
  }
}
</style>
