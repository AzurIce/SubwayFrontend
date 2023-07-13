<template>
      <main role="main" class="tbody">
        <div aria-busy="true" aria-label="Loading, please wait." data-text="北京交通大学软件学院2023暑期实训项目" role="progressbar">
        </div>
    </main>
</template>

<script>
// import 
export default {
    components:{

    }
}
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Sacramento:400|Montserrat:700);

[role="progressbar"] {
    position: relative;
}

/* [role="progressbar"] p {
    display: block;
    margin: 0;
    height: 60px;
    font-family: Sacramento, cursive;
    font-size: 3em;
    text-align: center;
} */

[role="progressbar"]::before,
[role="progressbar"]::after {
    display: block;
    height: 60px;
    font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 2em;
    text-transform: uppercase;
    content: attr(data-text);
}

[role="progressbar"]::before {
    color: #F8D800;
}

[role="progressbar"]::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    color: #32CCBC;
    overflow: hidden;
}

[role="progressbar"][aria-busy="true"]::after {
    animation: load ease-out 10s infinite forwards;
}

@keyframes load {
    0%,
    10%,
    100% {
        height: 0;
    }

    90% {
        height: 120px;
    }
}

.tbody{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}
</style>