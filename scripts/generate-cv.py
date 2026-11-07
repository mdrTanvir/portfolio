"""Generate the public CV from website data supplied on stdin.
Requires reportlab. See README for commands.
"""
import sys,json,re,hashlib
from pathlib import Path
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

raw_content=sys.stdin.read()
content=json.loads(raw_content)
content_hash=hashlib.sha256(raw_content.encode('utf-8')).hexdigest()
profile=content['profile']
out=Path(sys.argv[1] if len(sys.argv)>1 else 'src/public/Md-Tanvir-Rahman-Resume.pdf')
styles=getSampleStyleSheet()
blue=colors.HexColor('#0369a1');ink=colors.HexColor('#1e293b')
for name,kw in {
 'NameTR':dict(fontName='Helvetica-Bold',fontSize=23,leading=27,spaceAfter=4,textColor=ink),
 'RoleTR':dict(fontSize=10.5,leading=14,spaceAfter=6,textColor=blue),
 'BodyTR':dict(fontSize=9,leading=12.5,spaceAfter=5,textColor=ink),
 'HeadingTR':dict(fontName='Helvetica-Bold',fontSize=10.5,leading=14,spaceBefore=10,spaceAfter=6,textColor=blue),
 'JobTR':dict(fontName='Helvetica-Bold',fontSize=9.5,leading=13,spaceBefore=6,spaceAfter=2,textColor=ink),
 'MetaTR':dict(fontSize=8.5,leading=11.5,spaceAfter=4,textColor=colors.HexColor('#475569')),
 'BulletTR':dict(fontSize=9,leading=12.5,leftIndent=10,firstLineIndent=-8,spaceAfter=3,textColor=ink),
}.items():styles.add(ParagraphStyle(name=name,**kw))
def clean(s):
 return s.replace('’',"'").replace('‘',"'").replace('–','-').replace('—','-').replace('·','|')
def para(s,style='BodyTR'):return Paragraph(escape(clean(s)),styles[style])
def heading(s):return para(s.upper(),'HeadingTR')
def link(url,label):return '<link href="'+escape(url,quote=True)+'" color="#0369a1">'+escape(label)+'</link>'
story=[para('TANVIR RAHMAN','NameTR'),para('Software Development | Data Analytics | IT Support','RoleTR')]
story.append(para(f"{profile['address']} | {profile['phone']} | {profile['email']}",'MetaTR'))
story.append(Paragraph(' | '.join([link(profile['meta']['siteUrl'],'www.tanvirrahman.dev'),link(profile['github'],'github.com/mdrTanvir'),link(profile['socials'][0]['link'],'LinkedIn')]),styles['MetaTR']))
story.append(heading('Profile'))
# Reuse the website's introduction and purpose without duplicating its full About section.
story.append(para(profile['about'][0]+' '+profile['about'][-1]))
story.append(heading('Skills'))
for category,items in content['skills'].items():
 story.append(Paragraph('<b>'+escape(category)+':</b> '+escape(' | '.join(clean(i['name']) for i in items)),styles['BodyTR']))
story.append(heading('Experience'))
for e in content['experiences']:
 block=[para(e['title']+' | '+e['company'],'JobTR'),para(e['startDate']+' - '+e['endDate'],'MetaTR'),para(e['description'])]
 block.extend(para('- '+x,'BulletTR') for x in e['highlights'])
 story.append(KeepTogether(block))
story.append(PageBreak())
story.append(para('TANVIR RAHMAN | EDUCATION & PROJECTS','RoleTR'))
story.append(heading('Education'))
for e in content['educations']:
 story.append(KeepTogether([para(e['title']+' | '+e['institution'],'JobTR'),para(e['duration'],'MetaTR'),para(e['description'])]))
story.append(heading('Projects'))
for p in content['projects']:
 block=[para(p['name'],'JobTR'),para(p['for']+' | '+p['date'],'MetaTR'),para(p['description']),para('Tools: '+' | '.join(p['skills']),'MetaTR')]
 links=[]
 if p['url']:links.append(link(p['url'],'Platform website' if p['name']=='ExerTime Platform' else 'Live dashboard'))
 if p['repository']:links.append(link(p['repository'],'Repository and methodology'))
 if links:block.append(Paragraph(' | '.join(links),styles['MetaTR']))
 story.append(KeepTogether(block))
def footer(c,d):
 c.setStrokeColor(colors.HexColor('#cbd5e1'));c.line(38,33,557,33)
 c.setFont('Helvetica',8);c.setFillColor(colors.HexColor('#64748b'));c.drawString(38,21,'Tanvir Rahman | www.tanvirrahman.dev');c.drawRightString(557,21,str(d.page))
out.parent.mkdir(parents=True,exist_ok=True)
SimpleDocTemplate(str(out),pagesize=(595.28,841.89),leftMargin=38,rightMargin=38,topMargin=30,bottomMargin=44,title='Tanvir Rahman - CV',author='Tanvir Rahman',subject='Portfolio content SHA256 '+content_hash).build(story,onFirstPage=footer,onLaterPages=footer)
