<template>
  <div>
    <tr>
      <td>{{ cwriter }}</td>
      <td>{{ ccontent }}</td>
    </tr>
    <tr>
      <td colspan="3">{{ ccontent }}</td>
    </tr>
  </div>
</template>
 
<script>
export default {
  name: "commentList",
  props: {
    cwriter: { type: String },
    ccontent: { type: String },
  },
  methods: {},
};
</script>
