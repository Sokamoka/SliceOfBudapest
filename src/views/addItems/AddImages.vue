<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">Képek feltöltése ({{ step + 1 }}/{{ maxStep }})</h1>
    </section>
    <section class="section">
      <div class="field">
          <div class="file is-large is-boxed">
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
    </section>
    <section class="section">
      <div class="columns is-multiline">
        <div
          class="column is-2"
          v-for="(img, index) in sortedImages"
          :key="index"
        >
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="img.dataURL" :alt="img.name">
            </figure>
          </div>
          <div class="card-content">
            <button
              type="button"
              class="button is-small is-danger"
              @click="deleteImage(img.name)"
            >Delete</button>
          </div>
        </div>
        </div>
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
// import merge from '@/utils/object/merge';
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
  computed: {
    sortedImages() {
      return this.images.slice(0).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
  },
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
      for (let file of files) {
        const index = this.images.findIndex(item => item.name === file.name);
        if (index === -1) this.setupReader(file);
      }
    },
    setupReader(file) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const imageObject = {
          name: file.name,
          file: file,
          dataURL: event.target.result
        };
        this.images.push(imageObject);
        // this.images = merge(this.images, imageObject, 'name');
      };
      fileReader.readAsDataURL(file);
    },
    deleteImage(name) {
      this.$store.dispatch('property/deleteImage', name);
    }
  }
};
</script>
