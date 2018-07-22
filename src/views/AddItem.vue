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
      <transition name="step-transition" mode="out-in">
        <component
          :is="currentStepComponent"
          :step="currentStep"
          :max-step="maxStep"
          :button-labels="currentButtonLabels"
          @step-next="stepNext"
          @step-prev="stepPrev"
          @on-complete="submitProperty"
        ></component>
      </transition>  

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import BaseData from './addItems/BaseData';
import Address from './addItems/Address';
import MoreDetails from './addItems/MoreDetails';
import Description from './addItems/Description';

export default {
  name: 'AddItem',
  components: {
    BaseData,
    Address,
    MoreDetails,
    Description
  },
  data() {
    return {
      steps: ['BaseData', 'Address', 'MoreDetails', 'Description'],
      stepObjects: ['base', 'address', 'details', 'description'],
      buttonLabels: [
        {
          next: 'Cím megadása'
        },
        {
          next: 'További adatok megadása',
          prev: 'Alapadatok megadása'
        },
        {
          next: 'Leírás megadása',
          prev: 'Cím megadása'
        },
        {
          next: 'Mentés',
          prev: 'További adatok megadása'
        }
      ],
      currentStep: 0,
      isOnOffer: true
    };
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('property', ['property']),
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
    ...mapActions('properties', ['addProperty']),
    ...mapActions('property', ['resetStateProperty']),
    async submitProperty() {
      this.addProperty(this.property);
      this.$toasted.show('Properties Added!').goAway(3000);
      this.currentStep = 0;
      this.resetStateProperty();
    },
    stepNext() {
      this.currentStep++;
    },
    stepPrev() {
      this.currentStep--;
    }
  }
};
</script>
<style>
.section-progress {
  margin-top: 30px;
}
</style>
