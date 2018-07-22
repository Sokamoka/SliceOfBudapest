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
          :is-on-offer="isOnOffer"
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
      properties: {},
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
    // isOnOffer() {
    //   console.log('xxx:', this.properties[this.stepObjects[0]]);
    //   if (this.properties.base) {
    //     return this.properties.base.type === 'eladó';
    //   }
    //   return true;
    // },
    currentStepComponent() {
      return this.steps[this.currentStep];
    },
    componentData: {
      get() {
        return this.properties[this.stepObjects[this.currentStep]];
      },
      set(value) {
        if (value.type) {
          this.isOnOffer = value.type === 'eladó';
        }
        this.properties[this.stepObjects[this.currentStep]] = value;
        if (this.currentStep < this.maxStep - 1) this.currentStep++;
      }
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
    async submitProperty() {
      // this.addProperty(this.properties);
      this.$toasted.show('Properties Added!').goAway(3000);
      this.properties = {};
      this.currentStep = 0;
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
