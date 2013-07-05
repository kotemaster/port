<h1>Cheat Sheet</h1>

<h2>Unix Shell/File System</h2>
<h3>Files and Directories</h3>
<ul>
    <li><code>/</code> - root directory, there is nothing above it</li>
    <li><code>.</code> - current directory</li> 
    <li><code>..</code> - parent directory of the directory you are currently in.  Example: when you are in <code>dev</code> then <code>..</code> points to <code>Desktop</code></li> 
    <li><code>~</code> - home directory (on your mac it is <code>/Users</code>, on linux it is usually <code>/home</code>)</li>
</ul>
<h3>Unix commands</h3>
<ul>
    <li><i>Moving around and getting info:</i></li>
    <li><code>pwd</code> - print working directory, use it if you don't know where you are in the directory structure</li>
    <li><code>ls</code> - list content of the current directory same as <code>ls .</code></li> 
    <li><code>ls &lt;directory name&gt;</code> - list specified of the current directory. Example <code>ls /Users/tuc/Desktop/dev or ls ..</code></li>
    <li><code>cd</code> - (equivalent to <code>cd ~</code>or<code>cd /Users/tuc</code>) - without arguments puts you in your home directory.</li>
    <li><code>cd &lt;directory name&gt;</code> - change to specified directory. Example <code>cd /</code>or<code>cd ~</code>or<code>cd new</code></li>
    <li><i>Copying files:</i></li>
    <li><code>cp &lt;file name&gt; &lt;new location&gt;</code> - create a copy of a file in a new location. Examples:<li>
    <li>
        <ul>
            <li><code>cp a.html b.html</code> - copies file a.html to a new file called b.html in the same directory</li>
            <li><code>cp a.html new</code> - if directory <code>new</code> exists in your current directory then the command copies file a.html to that directory keeping the name a.html.</li>
            <li><code>cp a.html new/b.htm</code> - copies file a.html to a directory called <code>new</code> then new file name is b.html in the new directory.</li>
        </ul>
    </li>
    <li><i>Moving/renaming files:</i></li>
    <li>Exactly the same as <code>cp</code> except you use <code>mv</code></li>
</ul>
<h3>Git</h3>
<ul>
    <li><code>git clone git@github.com:kotemaster/port.git</code> - this should pull all the files from github and put them in directory called <code>port</code></li>
    <li><code>git pull</code> - once have a clone (which you have) you can pull from git any changes that somebody else (i.e. Tuć) made to</li>
    <li><code>git status</code> - when you made changes to some files this command tells you which files have been changed</li>
    <li><i>option 1</i>
    <li><code>git commit -am'say something here'</code> - you need this before you push, it prepares file for the push
    <li><code>git push</code> - once you did <code>commit</code> you can push it to git.  At that point the files can be viewed and downloaded from git</li>
    <li><i>option 2</i>
    <li><code>gitpush</code> - I made this command on your computer, it does commit and push at the same time.  Use it for now and ignore option 1.</li>
</ul>
