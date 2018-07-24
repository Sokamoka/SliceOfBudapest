<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">Képek feltöltése ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="section">

        <div class="field">
          <div class="file is-large is-box">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                accept="image/*"
                multiple
                @change="onFileSelected"
              >
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Large file…
                </span>
              </span>
            </label>
          </div>
        </div>
        <section class="section">
          <figure 
            class="image is-128x128"
            v-for="(img, index) in images"
            :key="index"
          >
            <img :src="img.dataURL">
          </figure>
        </section>

      </div>
    </section>
    <section class="section">
      <div class="field is-grouped is-grouped-right">
         <p class="control">
          <button
            type="button"
            class="button is-light is-medium"
            @click="clickPrev"
          >
            <span class="icon is-small">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span>{{ buttonLabels.prev }}</span>
          </button>
        </p>
        <p class="control">
          <button
            type="button"
            class="button is-primary is-medium"
            @click="clickNext"
          >
            <span>{{ buttonLabels.next }}</span>
            <span class="icon is-small">
              <i class="fas fa-arrow-right"></i>
            </span>
          </button>
        </p>
      </div>
    </section>
  </div>
</template>
<script>
// import { createHelpers } from 'vuex-map-fields';
import merge from '@/utils/object/merge';
import ControlInput from '@/components/form-controls/control-input';
import ControlSelect from '@/components/form-controls/control-select';

// const { mapFields } = createHelpers({
//   getterType: 'getAddressField',
//   mutationType: 'updateAddressField'
// });

export default {
  components: {
    ControlInput,
    ControlSelect
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  props: {
    step: {
      type: Number
    },
    maxStep: {
      type: Number
    },
    buttonLabels: {
      type: Object
    }
  },
  data() {
    return {
      images: []
    };
  },
  computed: {},
  created() {
    this.images = this.$store.getters['property/images'];
  },
  watch: {
    images() {
      this.$store.commit('property/updateImages', this.images);
    }
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      if (result) this.$emit('step-next');
    },
    clickPrev() {
      this.$emit('step-prev');
    },
    onFileSelected(event) {
      const files = event.target.files;
      // console.log(files);
      for (let file of files) {
        this.setupReader(file);
      }
    },
    setupReader(file) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const imageObject = [
          {
            name: file.name,
            file: file,
            dataURL: event.target.result
          }
        ];
        // this.images.push(imageObject);
        this.images = merge(this.images, imageObject, 'name');
      };
      fileReader.readAsDataURL(file);
    }
  }
};
</script>
