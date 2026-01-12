<script setup lang="ts">
import {Button} from "./components/ui";
</script>
<template>
<router-view/>
 <div class="flex min-h-screen justify-center items-center ">
   <RouterLink to="/ui-design">
     <Button variant="destructive" >Ui Design System</Button>
   </RouterLink>
 </div>
</template>
