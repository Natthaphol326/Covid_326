<template>
  <div class="container">
    <div class="img-fluid">
      <img
        src="https://www.invasivespecies.scot/sites/sisi8/files/styles/hero/public/_hero%20image%20covid.png?itok=i0l-YZwQ"
        alt=""
      />
    </div>
    <div class="text middle">
      <span>C</span>
      <span class="hidden">O</span>
      <span>V</span>
      <span class="hidden">I</span>
      <span class="hidden">D</span>
      <span class="hidden">-</span>
      <span class="hidden">1</span>
      <span class="hidden">9</span>
    </div>
    <form @submit.prevent="addData">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="ชื่อ - สกุล"
              v-model="name"
              required
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Tel</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="เบอร์โทร"
              v-model="tel"
              maxlength="10"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="exampleInputPassword1" class="form-label">ATK Test</label>
          <select
            class="form-select"
            aria-label="Default select example"
            placeholder="ผลตรวจ ATK"
            v-model="atk"
            required
          >
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Email
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="- Email -"
              v-model="email"
              required
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="startDate" class="form-label">Date</label>
            <input
              id="startDate"
              class="form-control"
              type="date"
              v-model="date"
              required
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <button type="submit" class="btn btn1">Submit</button>
        </div>
      </div>
    </form>
    <div>
      <table class="table table-striped table-hover">
        <thead class="table-primary">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">วันที่</th>
            <th scope="col">ชื่อ - นามสกุล</th>
            <th scope="col">ผลตรวจ ATK</th>
            <th scope="col">เบอร์โทร</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in csDoc" :key="index" align="center">
            <td>{{ index + 1 }}</td>
            <td>{{ item.data.ddate }}</td>
            <td>{{ item.data.nname }}</td>
            <td>{{ item.data.aatk }}</td>
            <td>{{ item.data.ttel }}</td>
            <td>{{ item.data.eemail }}</td>
            <td>
              <button class="btns btn2" @click="Del(item.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../plugin/firebaseInit";
export default {
  data() {
    return {
      csDoc: [],
      name: "",
      email: "",
      atk: "",
      tel: "",
      date: "",
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "covid"), {
          nname: this.name,
          eemail: this.email,
          aatk: this.atk,
          ttel: this.tel,
          ddate: this.date,
        });
        this.name = "";
        this.email = "";
        this.atk = "";
        this.tel = "";
        this.date = "";
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      // const querySnapshot = await getDocs(collection(db, "covid"));
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      //   this.csDoc.push(doc.data());
      // });
      this.csDoc = [];
      const q = query(collection(db, "covid"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
    async Del(id) {
      this.csDoc = [];
      console.log("Delete" + id);
      try {
        await deleteDoc(doc(db, "covid", id));
        window.location.reload(false);
      } catch (e) {
        console.log("delete" + e);
      }
    },
  },
};
</script>
<style>
.btn {
  background: none;
  border: 2px solid rgb(85, 231, 236);
  font-family: "montserrat", sans-serif;
  text-transform: uppercase;
  padding: 6px 10px;
  min-width: 130px;
  margin: 10px;
  cursor: pointer;
  transition: color 0.4s linear;
  position: relative;
}
.btns {
  background: none;
  border: 2px solid rgb(0, 0, 0);
  font-family: "montserrat", sans-serif;
  text-transform: uppercase;
  padding: 6px 10px;
  min-width: 130px;
  margin: 10px;
  cursor: pointer;
  transition: color 0.4s linear;
  position: relative;
}
.btn:hover {
  color: rgb(37, 34, 238);
}
.btns:hover {
  color: rgb(248, 245, 245);
}
.btn::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(193, 219, 43);
  z-index: -1;
  transition: transform 0.5s;
  transform-origin: 0 0;
  transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
}
.btns::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(233, 23, 23);
  z-index: -1;
  transition: transform 0.5s;
  transform-origin: 0 0;
  transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
}
.btn1::before {
  transform: scaleX(0);
}
.btn2::before {
  transform: scaleY(0);
}
.btn1:hover::before {
  transform: scaleX(1);
}
.btn2:hover::before {
  transform: scaleY(1);
}

.middle {
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
}
.text {
  color: rgb(28, 161, 68);
  font-size: 70px;
  font-family: "montserrat";
  font-weight: 900;
  cursor: pointer;
}
.hidden {
  max-width: 0;
  opacity: 0;
  transition: 0.5s ease-in;
}
.text:hover .hidden {
  opacity: 1;
  max-width: 1em;
}
</style>
