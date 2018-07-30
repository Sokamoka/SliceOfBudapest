<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
              Ingatlan Adatlap
          </h1>
          <h2 class="subtitle">
              Hero subtitle
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
    <div class="container">
      <error :on-error="onError" @close="offError"></error>
      <div class="columns">
        <div :class="mainColumnClasses">
          <section class="images">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ propertyTitle }}
                </p>
              </header>
              <!-- <div class="card-image">
              </div> -->
              <div :class="gridClasses">
                <div
                  v-for="(img, index) in limitedImages"
                  :key="index"
                  :style="bgImagesStyle(img)"
                  @click="imgIndex = index"
                >
                  <div
                    v-if="imagesLength > 3 && index === 2"
                    class="more"
                  >
                    <div>+{{ imagesLength - 3 }}</div>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                  <a href="#">#css</a> <a href="#">#responsive</a>
                  <br>
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </div>
          </section>
          <section class="section-sub">
            <div class="columns is-multiline details">
              <div
                class="column is-half"
                v-for="(detail, key) in details"
                :key="key"
              >
                <div class="is-flex">
                  <label class="label">{{ $t('details.' + key) }}:</label>
                  <div :class="getDetailsDataClass(detail)">
                    {{ getDetailsData(detail) }}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section-sub">
            {{ description }}
          </section>
        </div>
        <div v-if="isLoggedIn" class="column is-4">
          <comment-box :is-saveing="isCommentSaveing" @change="changeComment"></comment-box>
        </div>
      </div>
    </div>
    </section>
    <gallery
      :images="images"
      :index.sync="imgIndex"
      @change="changeGallery"
      @close="closeGallery"
      caption
    ></gallery>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { router } from '@/router';
import CommentBox from '../components/Comments';
import Error from '@/components/Error.vue';
import Gallery from '@/components/Gallery';

export default {
  name: 'Property',
  components: {
    CommentBox,
    Error,
    Gallery
  },
  data() {
    return {
      isCommentSaveing: false,
      imgIndex: null
    };
  },
  computed: {
    ...mapGetters('properties', ['getProperty', 'description', 'onError']),
    ...mapGetters('error', ['onError']),
    ...mapGetters('auth', ['isLoggedIn']),
    property() {
      return this.getProperty ? this.getProperty[0] : null;
    },
    propertyTitle() {
      if (this.property) {
        const city = this.property.address.district
          ? this.property.address.district + '. kerület'
          : this.property.address.city;
        return `${city}, ${this.property.address.street}`;
      }
      return '';
    },
    description() {
      return this.property ? this.property.description : '';
    },
    details() {
      return this.property ? this.property.details : {};
    },
    mainColumnClasses() {
      return {
        column: true,
        'is-8': this.isLoggedIn
      };
    },
    limitedImages() {
      return this.property ? this.property.images.slice(0, 3) : {};
    },
    images() {
      return this.property ? this.property.images : [];
    },
    imagesLength() {
      return this.property ? this.property.images.length : 0;
    },
    gridClasses() {
      return {
        wrapper: true,
        'is-1': this.limitedImages.length === 1,
        'is-2': this.limitedImages.length === 2,
        'is-3': this.limitedImages.length === 3
      };
    }
  },
  created() {
    this.initProperty(this.$route.params.id);
  },
  mounted() {
    console.log(this.$route.params);
    this.imgIndex = this.$route.params.index
      ? parseInt(this.$route.params.index)
      : null;
  },
  methods: {
    ...mapActions('error', ['offError']),
    ...mapActions('properties', ['initProperty', 'saveComment']),
    getDetailsData(data) {
      return data ? data : 'nincs adat';
    },
    getDetailsDataClass(data) {
      const isEmpty = data ? false : true;
      return {
        'is-empty': isEmpty
      };
    },
    bgImagesStyle(src) {
      return {
        backgroundImage: `url('${src}')`
      };
    },
    async changeComment(comment) {
      // console.log(comment);
      this.isCommentSaveing = true;
      await this.saveComment(comment);
      this.isCommentSaveing = false;
      this.$toasted.show('Comment saved!').goAway(3000);
    },
    changeGallery(index) {
      const locale = this.$i18n.locale;
      const id = this.$route.params.id;
      router.replace({ path: `/${locale}/property/${id}/g/${index}` });
    },
    closeGallery() {
      const locale = this.$i18n.locale;
      const id = this.$route.params.id;
      router.replace({ path: `/${locale}/property/${id}` });
    }
  }
};
</script>
<style lang="scss">
section.images {
  margin-bottom: 48px;

  .wrapper {
    display: grid;
    grid-gap: 1px;
    height: 450px;

    &.is-1 {
      grid-template-columns: 100%;
      > div {
        &:nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }
      }
    }

    &.is-2 {
      grid-template-columns: 60% 40%;
      > div {
        &:nth-child(1) {
          grid-column: 1;
          grid-row: 1 / 3;
        }
        &:nth-child(2) {
          grid-column: 2;
          grid-row: 1 / 3;
        }
      }
    }

    &.is-3 {
      grid-template-columns: 70% 30%;
      > div {
        &:nth-child(1) {
          grid-column: 1;
          grid-row: 1 / 3;
        }
        &:nth-child(2) {
          grid-column: 2;
          grid-row: 1;
        }
        &:nth-child(3) {
          grid-column: 2;
          grid-row: 2;
        }
      }
    }

    > div {
      position: relative;
      background-color: lightgray;
      background-size: cover;
      background-position: 50% 50%;
      cursor: pointer;

      .more {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        color: #ffffff;
        text-align: center;
        font-size: 45px;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.details {
  label {
    min-width: 60%;
  }
  .is-empty {
    color: gray;
  }
}
</style>
