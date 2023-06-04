<template>
<footer id="footer" class="p-5 bg-dark">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 text-center text-sm-start">
      <div class="col">
        <h4>Resources</h4>
        <ul class="list-unstyled">
          <li><a href="#">About</a></li>
          <li><a href="#">Resource listing</a></li>
          <li><a href="#">Press kit</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Help</h4>
        <ul class="list-unstyled">
          <li><a href="#">Stack Overflow</a></li>
          <li><a href="#">Join Discord</a></li>
          <li><a href="#">Gitter</a></li>
          <li><a href="#">Report Issues</a></li>
          <li><a href="#">Code of Conduct</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Community</h4>
        <ul class="list-unstyled">
          <li><a href="#">Events</a></li>
          <li><a href="#">Meetups</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">GitHub</a></li>
          <li><a href="#">Contribute</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Languages</h4>
        <ul class="list-unstyled">
          <li><a href="#">English</a></li>
          <li><a href="#">Español</a></li>
          <li><a href="#">Portuguese</a></li>
          <li><a href="#">简体中文版</a></li>
          <li><a href="#">Complete language list</a></li>
        </ul>
      </div>
    </div>
    <div id="footer-bottom" class="pt-5 text-center" >
      <p>Copyright &copy; 2023 - Party Time</p>
    </div>
  </div>
</footer>
</template>

<style scoped>
#footer {
  color: #FFF;
}
#footer .container {
  max-width: 968px;
  margin: 0 auto;
}

#footer h4 {
  text-transform: uppercase;
}

#footer a {
  text-decoration: none;
  transition: 0.5s;
  color: #FFF;
}

#footer a:hover {
  text-decoration: underline;
}
</style>