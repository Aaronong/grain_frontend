const url = "https://grain-interview.herokuapp.com/orders";
// const url = "http://0.0.0.0:3000/orders";

Vue.component("dish-logo", {
  template: `<svg onclick="reloadPage()" version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve" width="200px" height="200px">
  <g id="logo-background">
    <circle id="background-circle" class="logo-circle" cx="250" cy="250" r="227" />
  </g>
  <g id="logo-ring">
    <path id="ring-circle" class="logo-ring" d="M249.8,40C134.3,40,40.4,134,40.4,249.3s94,209.2,209.3,209.2S459,364.5,459,249.2
         S365,40,249.7,40H249.8z M249.8,441.8c-106.2,0-192.6-86.4-192.6-192.6S143.6,56.8,249.8,56.8S442.3,143,442.3,249.3
         S356,441.8,249.7,441.8H249.8z" />
  </g>
  <g id="logo-fork">
    <path id="fork-body" class="logo-fork" d="M131,357.4l140-140l20.3,20.5L151.5,377.7L131,357.4z" />
    <path id="fork-head" class="logo-fork" d="M386.2,152.6c-7,2.4-62.8,73.8-65.6,61.2c-1.3-5.5,10.3-16.5,22.4-29.7
         c15.8-17.2,33.6-37,35.4-41.7c3.2-8-36.4,29.5-42,34.7S316,199.7,308,200.3c-5.4,0.5,20.4-23.7,39.8-44.3
         c16.6-17.7,23.8-28.7,18.6-26c-6.5,3.7-30.3,25.7-53.8,46.7c-12.6,11.4-20.7,15.7-13.8,4s73.6-60.5,60-58.3s-66.7,43.7-83,58.5
         s-6.8,33-5.6,38s-8.6,16-8.6,16l8.4,16c0,0,6-6.5,9.4-7.6s7.4-7,18-3.4s17.4,0.6,24.3-2.7s12.7-11.8,20.5-19.6s51.3-67.5,44.2-65
         L386.2,152.6z" />
  </g>
  <g id="logo-knife">
    <path id="knife-body" class="logo-knife" d="M244,265.5l22.4-22.3l109,109L353,374.5L244,265.5z" />
    <path id="knife-head" class="logo-knife" d="M149.7,125.6c0,0-14.2,14.7-22.4,39s8,47,8,47l62.8,63.6l51.7-51.5L149.7,125.6z"
    />
  </g>
</svg>`
});

Vue.component("comment-unavailable", {
  template: `<svg width="60px" height="60px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M3.439 3l-1.439-1.714 1.532-1.286 17.382 20.714-1.533 1.286-2.533-3.019h-5.848l-7 5.02v-5.02h-4v-15.981h3.439zm11.747 14l-10.068-11.999h-3.118v11.999h4v3.105l4.357-3.105h4.829zm8.814 1.981h-2.588l-1.662-1.981h2.25v-11.999h-12.319l-1.679-2.001h15.998v15.981z"/></svg>`
});

Vue.component("comment-available", {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path d="M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z"/></svg>`
});

Vue.component("upvote", {
  props: ["rating"],
  template: `<svg id="upvote" viewBox="0 0 1280 1280" width="60px" height="60px" v-bind:class="{selectedHeart : rating === 1, unselectedHeart : rating !== 1}">
  <path d="M640.8,1168.9c189.1-91.6,310-180.8,471.6-355.9s169.7-474.1-26.9-611.5S640.8,285,640.8,285S392.7,64.1,196.1,201.5
  S7.5,637.9,169.1,813S451.7,1077.3,640.8,1168.9z"></path>
</svg>`
});

Vue.component("downvote", {
  props: ["rating"],
  template: `<svg id="downvote" viewBox="0 0 1280 1280" width="60px" height="60px" v-bind:class="{selectedHeart : rating === -1, unselectedHeart : rating !== -1}">
  <path d="M640.8,1168.9c-189.1-91.6-310-180.8-471.6-355.9S-0.6,338.9,196.1,201.5S640.8,285,640.8,285l79.1,134L519.4,627.4
      L756.3,847L640.8,1168.9z"></path>
  <path d="M715.1,1130.2c0,0,241.4-142.8,403-317.9s169.7-474.1-26.9-611.5s-404.1,53.7-404.1,53.7l151,173.4L648.8,619.5L854,827.8
      L715.1,1130.2z"></path>
</svg>`
});

function order_to_feedback_list(order) {
  feedbacks = [];
  feedbacks.push({
    ratable_id: order.id,
    ratable_type: "DeliveryOrder",
    rating: 0,
    comment: ""
  });
  order.order_items.forEach(function(element) {
    feedbacks.push({
      name: element.name,
      ratable_id: element.order_item_id,
      ratable_type: "OrderItem",
      rating: 0,
      comment: ""
    });
  });
  console.log(feedbacks);
  return feedbacks;
}

Vue.component("feedbackmodal", {
  props: ["order"],
  data: function() {
    return {
      feedbacks: order_to_feedback_list(this.order)
    };
  },
  methods: {
    upvoteFood: function(index) {
      console.log(this.feedbacks[index]);
      this.feedbacks[index].rating = this.feedbacks[index].rating === 1 ? 0 : 1;
    },
    downvoteFood: function(index) {
      console.log(this.feedbacks[index]);
      this.feedbacks[index].rating =
        this.feedbacks[index].rating === -1 ? 0 : -1;
    },
    submit: function() {
      var posturl = url + "/" + this.order.id + "/feedbacks";
      var processedFeedback = this.feedbacks.map(function(item) {
        var mapped = JSON.parse(JSON.stringify(item));
        if (mapped.name) {
          delete mapped.name;
        }
        return mapped;
      });
      const modal_id = "#" + this.order.order_id;
      axios
        .post(posturl, { feedbacks: processedFeedback })
        .then(function(response) {
          console.log(response);
          $(modal_id).modal("hide");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  template: `
  <div v-bind:id="order.order_id" class="modal fade" role="dialog">
      <div class="modal-dialog">

          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <div class="flex-container">
                      <h1 class="modal-title">Rate order {{order.order_id}}</h1>
                  </div>
              </div>
              <div class="modal-body flex-container">
                  <div class="banner">
                      How was our delivery?
                  </div>
                  <div class="row-container">
                      <a v-on:click="upvoteFood(0)">
                          <upvote v-bind:rating="feedbacks[0].rating"></upvote>
                      </a>
                      <h2>Courier</h2>
                      <a v-on:click="downvoteFood(0)">
                        <downvote v-bind:rating="feedbacks[0].rating"></downvote>
                      </a>
                  </div>

                  <input type="text" class="form-control" v-model="feedbacks[0].comment" placeholder="How may we serve you better?">

                  <div class="banner">
                      How was our food?
                  </div>
                  <div class="flex-container" v-for="(food, index) in feedbacks">
                      <div v-if="food.name">
                        <div class="row-container">
                            <a v-on:click="upvoteFood(index)">
                              <upvote v-bind:rating="food.rating"></upvote>
                            </a>
                            <h2>{{food.name}}</h2>
                            <a v-on:click="downvoteFood(index)">
                              <downvote v-bind:rating="food.rating"></downvote>
                            </a>
                        </div>
                        <input type="text" class="form-control" v-model="food.comment" placeholder="How may we serve you better?">
                      </div>
                  </div>

              </div>
              <div class="modal-footer">
                  <button type="button" v-on:click="submit" class="btn btn-info btn-lg">Submit</button>
                  <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">Close</button>
              </div>
          </div>

      </div>
  </div>`
});

function to_date(delivery_date, delivery_time) {
  var date = new Date();
  const year = Number(delivery_date.slice(0, 4));
  const month = Number(delivery_date.slice(5, 7));
  const day = Number(delivery_date.slice(8, 10));
  const hour = Number(delivery_time.slice(0, 2));
  const min = Number(delivery_time.slice(3, 5));
  date.setFullYear(year, month - 1, day);
  date.setHours(hour, min);
  return date;
}

function sort_by_date(a, b) {
  return (
    to_date(a.delivery_date, a.delivery_time) <
    to_date(b.delivery_date, b.delivery_time)
  );
}

var app = new Vue({
  el: "#app",
  data: {
    orders: []
  },
  created: function() {
    orderData = this.orders;
    axios
      .get(url)
      .then(function(response) {
        response.data.forEach(function(element) {
          orderData.push(element);
        });
        console.log(orderData);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
