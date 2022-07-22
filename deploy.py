import ftplib
import os
import pathlib

server = 'ftp.postscriptum.games'
username = 'fuyxdo18'
password = 'RcytRDI0g-130!'
myFTP = ftplib.FTP(server, username, password)
local_path = pathlib.Path().resolve().as_posix() + '/build'

t= myFTP.pwd()
remote_path = '/public_html'

myFTP.cwd(remote_path)

def uploadThis(path):
    files = os.listdir(path)
    os.chdir(path)
    for f in files:
        if os.path.isfile(path + '/'+f):
            fh = open(f, 'rb')
            myFTP.storbinary('STOR %s' % f, fh)
            fh.close()
        elif os.path.isdir(path + '/' + f):
            if f not in myFTP.nlst():
                myFTP.mkd(f)
            myFTP.cwd(f)
            uploadThis(path + '/' + f)
    myFTP.cwd('..')
    os.chdir('..')


uploadThis(local_path)