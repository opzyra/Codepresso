<template>
  <div class="warp">
    <h2>임시 저장소</h2>
    <div class="close" @click="closePanel"><i class="mdi mdi-window-close"></i></div>
    <div class="card-list">
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
      <div class="card">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="/write?edit_id=614bfcb0-06c3-11e9-b6b7-e73be068fec2">2018-12-23 23:12 작성됨</a></h3>
            <div class="date">1일 전</div>
          </div>
          <button class="remove-button"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {
    closePanel () {
      this.$emit('closePanel', {})
    }
  }
}
</script>

<style scoped>
.warp {
  padding: 20px;
}
.warp h2 {
  margin: 0;
  font-weight: 500;
  font-size: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ced4da;
}
.warp .card-list {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.warp .card-list .card {
  border: 1px solid #dee2e6;
  color: #212529;
}
.warp .white-area {
  padding: 1rem 0.75rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.warp .white-area .post-info {
  flex: 1 1;
}
.warp .white-area .post-info h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}
.warp .white-area .post-info h3 a {
  text-decoration: none;
}
.warp .white-area .post-info .date {
  color: #495057;
  font-size: .875rem;
  margin-top: .25rem;
}
.warp .white-area .remove-button {
  width: 1.25rem;
  height: 2rem;
  font-size: 1.25rem;
  color: #e9ecef;
  border-radius: 1.5rem;
  border: 2px solid #e9ecef;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
}
.warp .white-area .remove-button:hover {
  color: #4158d0;
  border: 2px solid #4158d0;
}
.warp .card+.card {
  margin-top: 1.5rem;
}
.warp .close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
}
.warp .close:hover {
  color: #4158d0;
  cursor: pointer;
}
</style>
